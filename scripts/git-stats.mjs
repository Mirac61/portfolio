// Reads the local repos and writes src/data/git.json: commit log per project,
// lines of code per language and daily commit activity. Run it again to refresh:
//   node scripts/git-stats.mjs [repos-dir]
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const reposDir = process.argv[2] ?? join(homedir(), 'code/personal');
const PROJECT_DIRS = { ventorygo: 'ventorygo', mysh: 'mysh', vlanscape: 'Vlanscape', kairo: 'Kairo' };
const OWN_AUTHOR = /mirac|sancak/i;
const ACTIVITY_WEEKS = 26;
const LANGUAGES = {
  go: 'go',
  ts: 'typescript',
  tsx: 'typescript',
  vue: 'vue',
  java: 'java',
  kt: 'kotlin',
  cpp: 'c++',
  hpp: 'c++',
  cc: 'c++',
  sql: 'sql',
};
// only product commits in the visible log, no docs/chore/agent bookkeeping
const SHOWN_COMMIT = /^(feat|fix|refactor|perf)(\([^)]*\))?!?:/i;
const SKIP_PATH = /(^|\/)(node_modules|vendor|dist|build|generated)\/|\.min\.|_gen\.go$|\.pb\.go$/;

const git = (repo, ...args) => execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8', maxBuffer: 1 << 26 });

const repos = readdirSync(reposDir)
  .map((name) => join(reposDir, name))
  .filter((path) => existsSync(join(path, '.git')));

// lines of code per language over all repos (tracked files only)
const languages = {};
for (const repo of repos) {
  for (const file of git(repo, 'ls-files').split('\n')) {
    const language = LANGUAGES[file.split('.').pop()];
    if (!language || SKIP_PATH.test(file)) continue;
    let text;
    try {
      text = readFileSync(join(repo, file), 'utf8');
    } catch {
      continue; // listed but deleted in the working tree
    }
    const entry = (languages[language] ??= { files: 0, lines: 0, repos: new Set() });
    entry.files += 1;
    entry.lines += text.split('\n').filter((line) => line.trim() !== '').length;
    entry.repos.add(repo);
  }
}

// own commits per day for the last ACTIVITY_WEEKS weeks, ending on today's week
const today = new Date();
const start = new Date(today);
start.setUTCDate(start.getUTCDate() - start.getUTCDay() - (ACTIVITY_WEEKS - 1) * 7);
const startDay = start.toISOString().slice(0, 10);
const days = new Array(ACTIVITY_WEEKS * 7).fill(0);
const seen = new Set();
for (const repo of repos) {
  for (const line of git(repo, 'log', '--all', `--since=${startDay}`, '--format=%H\t%an\t%ae\t%as').split('\n')) {
    const [hash, name, email, date] = line.split('\t');
    if (!hash || seen.has(hash) || !OWN_AUTHOR.test(`${name} ${email}`)) continue;
    seen.add(hash);
    const index = Math.round((Date.parse(date) - Date.parse(startDay)) / 86_400_000);
    if (index >= 0 && index < days.length) days[index] += 1;
  }
}

const projects = {};
for (const [id, dir] of Object.entries(PROJECT_DIRS)) {
  const repo = join(reposDir, dir);
  const dates = git(repo, 'log', '--format=%as').trim().split('\n');
  const others = new Set(
    git(repo, 'log', '--format=%an\t%ae')
      .trim()
      .split('\n')
      .filter((author) => !OWN_AUTHOR.test(author))
      .map((author) => author.split('\t')[1]),
  );
  projects[id] = {
    commits: dates.length,
    first: dates.at(-1),
    last: dates[0],
    contributors: others.size + 1,
    log: git(repo, 'log', '--no-merges', '-300', '--format=%h\t%as\t%s')
      .trim()
      .split('\n')
      .map((line) => {
        const [hash, date, subject] = line.split('\t');
        return { hash, date, subject };
      })
      .filter(({ subject }) => SHOWN_COMMIT.test(subject))
      .slice(0, 6),
  };
}

const out = {
  generated: today.toISOString().slice(0, 10),
  repoCount: repos.length,
  languages: Object.entries(languages)
    .map(([name, { files, lines, repos: used }]) => ({ name, files, lines, repos: used.size }))
    .sort((a, b) => b.lines - a.lines),
  activity: { start: startDay, days },
  projects,
};

mkdirSync('src/data', { recursive: true });
writeFileSync('src/data/git.json', `${JSON.stringify(out, null, 2)}\n`);
console.log(`wrote src/data/git.json from ${repos.length} repos, ${seen.size} own commits in ${ACTIVITY_WEEKS} weeks`);
