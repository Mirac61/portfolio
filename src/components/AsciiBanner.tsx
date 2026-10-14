// figlet "ANSI Shadow" for MIRAC. Drawn as SVG from the character grid because
// no web font tiles █ and the double-line box glyphs without seams.
const ROWS = [
  '███╗   ███╗██╗██████╗  █████╗  ██████╗',
  '████╗ ████║██║██╔══██╗██╔══██╗██╔════╝',
  '██╔████╔██║██║██████╔╝███████║██║     ',
  '██║╚██╔╝██║██║██╔══██╗██╔══██║██║     ',
  '██║ ╚═╝ ██║██║██║  ██║██║  ██║╚██████╗',
  '╚═╝     ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝',
];

// one terminal cell is 6 × 12 units (1:2), double lines sit ±D around the centre
const W = 6;
const H = 12;
const D = 1.5;
const CX = W / 2;
const CY = H / 2;

// outer and inner stroke of each double-line glyph, in cell coordinates
const GLYPHS: Record<string, string> = {
  '═': `M0 ${CY - D}H${W}M0 ${CY + D}H${W}`,
  '║': `M${CX - D} 0V${H}M${CX + D} 0V${H}`,
  '╗': `M0 ${CY - D}H${CX + D}V${H}M0 ${CY + D}H${CX - D}V${H}`,
  '╔': `M${W} ${CY - D}H${CX - D}V${H}M${W} ${CY + D}H${CX + D}V${H}`,
  '╝': `M0 ${CY + D}H${CX + D}V0M0 ${CY - D}H${CX - D}V0`,
  '╚': `M${W} ${CY + D}H${CX - D}V0M${W} ${CY - D}H${CX + D}V0`,
};

const COLUMNS = Math.max(...ROWS.map((row) => row.length));

export function AsciiBanner() {
  return (
    <svg
      className="ascii-banner"
      viewBox={`0 0 ${COLUMNS * W} ${ROWS.length * H}`}
      role="img"
      aria-label="MIRAC"
    >
      {ROWS.map((row, y) => {
        const color = `var(--banner-${y + 1})`;
        const cells = [...row];
        return (
          <g key={y} fill={color} stroke={color}>
            {cells.map((cell, x) =>
              cell === '█' ? (
                <rect key={x} x={x * W} y={y * H} width={W} height={H} stroke="none" shapeRendering="crispEdges" />
              ) : null,
            )}
            <path
              d={cells.map((cell, x) => (GLYPHS[cell] ? shift(GLYPHS[cell], x * W, y * H) : '')).join('')}
              fill="none"
              strokeWidth={0.9}
            />
          </g>
        );
      })}
    </svg>
  );
}

// shift a glyph path written in cell coordinates to its absolute cell position
function shift(path: string, dx: number, dy: number): string {
  return path.replace(/([MHV])([\d.]+)(?: ([\d.]+))?/g, (_, cmd: string, a: string, b?: string) => {
    if (cmd === 'H') return `H${+a + dx}`;
    if (cmd === 'V') return `V${+a + dy}`;
    return `M${+a + dx} ${+(b ?? 0) + dy}`;
  });
}
