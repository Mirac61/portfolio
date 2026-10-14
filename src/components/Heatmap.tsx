import git from '../data/git.json';

const MONTHS = ['jan', 'feb', 'mär', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dez'];
const { start, days } = git.activity;
const weeks = Array.from({ length: days.length / 7 }, (_, week) => days.slice(week * 7, week * 7 + 7));
const total = days.reduce((sum, count) => sum + count, 0);

// four shades split at the quartiles of the active days, like GitHub's graph
const active = days.filter((count) => count > 0).sort((a, b) => a - b);
const thresholds = [0.25, 0.5, 0.75].map((q) => active[Math.floor(q * (active.length - 1))] ?? 0);
const level = (count: number) => (count === 0 ? 0 : 1 + thresholds.filter((limit) => count > limit).length);

// month label above the first week that starts in a new month; a first month
// shorter than two weeks gets none, its label would run into the next one
const monthOf = (week: number) => new Date(Date.parse(start) + week * 7 * 86_400_000).getUTCMonth();
const labelled = (week: number) =>
  week === 0 ? monthOf(0) === monthOf(2) : monthOf(week) !== monthOf(week - 1);

export function Heatmap() {
  return (
    <figure className="heatmap">
      <div className="heatmap-months" aria-hidden="true">
        {weeks.map((_, week) => (
          <span key={week}>{labelled(week) ? MONTHS[monthOf(week)] : ''}</span>
        ))}
      </div>
      <div className="heatmap-grid" role="img" aria-label={`${total} Commits in den letzten ${weeks.length} Wochen`}>
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="heatmap-week">
            {week.map((count, day) => (
              <span key={day} className={`cell level-${level(count)}`} />
            ))}
          </div>
        ))}
      </div>
      <figcaption>
        {total} commits in {weeks.length} wochen
      </figcaption>
    </figure>
  );
}
