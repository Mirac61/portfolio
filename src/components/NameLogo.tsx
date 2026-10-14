// figlet "ANSI Regular" output for MIRAC, kept as source so the SVG
// stays a pure function of this grid (exact cells, no overlap)
const LOGO_ROWS = [
  '███    ███ ██ ██████   █████   ██████ ',
  '████  ████ ██ ██   ██ ██   ██ ██      ',
  '██ ████ ██ ██ ██████  ███████ ██      ',
  '██  ██  ██ ██ ██   ██ ██   ██ ██      ',
  '██      ██ ██ ██   ██ ██   ██  ██████ ',
];

const COLUMNS = Math.max(...LOGO_ROWS.map((row) => row.length));

export function NameLogo() {
  return (
    <svg
      className="name-logo"
      viewBox={`0 0 ${COLUMNS} ${LOGO_ROWS.length}`}
      preserveAspectRatio="none"
      role="img"
      aria-label="Mirac"
    >
      <g shapeRendering="crispEdges">
        {LOGO_ROWS.flatMap((row, rowIndex) =>
          [...row].map((cell, colIndex) =>
            cell === '█' ? (
              <rect
                key={`${rowIndex}-${colIndex}`}
                x={colIndex}
                y={rowIndex}
                width={1}
                height={1}
                fill={`var(--logo-row-${rowIndex + 1})`}
              />
            ) : null,
          ),
        )}
      </g>
    </svg>
  );
}
