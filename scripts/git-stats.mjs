// Writes src/data/git.json: lines of code per language over the local repos and
// the GitHub contribution calendar, the same numbers as the graph on the profile.
// Needs a logged-in gh CLI. Run it again to refresh:
//   node scripts/git-stats.mjs [repos-dir]
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const reposDir = process.argv[2] ?? join(homedir(), 'code/personal');
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

// contributions per day for the last ACTIVITY_WEEKS weeks, ending on today's week.
// Same query as lifelog: the calendar counts commits, PRs, issues and reviews,
// private ones included, exactly like the graph on the GitHub profile.
const today = new Date();
const start = new Date(today);
start.setUTCDate(start.getUTCDate() - start.getUTCDay() - (ACTIVITY_WEEKS - 1) * 7);
const startDay = start.toISOString().slice(0, 10);
const query = `query($from: DateTime!, $to: DateTime!) {
  viewer {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar { weeks { contributionDays { date contributionCount } } }
    }
  }
}`;
const response = JSON.parse(
  execFileSync(
    'gh',
    ['api', 'graphql', '-f', `query=${query}`, '-f', `from=${startDay}T00:00:00Z`, '-f', `to=${today.toISOString()}`],
    { encoding: 'utf8' },
  ),
);
const days = new Array(ACTIVITY_WEEKS * 7).fill(0);
for (const week of response.data.viewer.contributionsCollection.contributionCalendar.weeks) {
  for (const { date, contributionCount } of week.contributionDays) {
    const index = Math.round((Date.parse(date) - Date.parse(startDay)) / 86_400_000);
    if (index >= 0 && index < days.length) days[index] = contributionCount;
  }
}

const out = {
  generated: today.toISOString().slice(0, 10),
  repoCount: repos.length,
  languages: Object.entries(languages)
    .map(([name, { files, lines, repos: used }]) => ({ name, files, lines, repos: used.size }))
    .sort((a, b) => b.lines - a.lines),
  activity: { start: startDay, days },
};

mkdirSync('src/data', { recursive: true });
writeFileSync('src/data/git.json', `${JSON.stringify(out, null, 2)}\n`);
const total = days.reduce((sum, count) => sum + count, 0);
console.log(`wrote src/data/git.json from ${repos.length} repos, ${total} contributions in ${ACTIVITY_WEEKS} weeks`);
