// Hand-drawn 5×7 bitmap face. Used for the name (and the monogram) only.
// ponytail: only the glyphs the name needs; add a row set here when a new letter shows up.
const GLYPHS = {
  G: ['.###.', '#...#', '#....', '#.###', '#...#', '#...#', '.###.'],
  O: ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  N: ['#...#', '##..#', '#.#.#', '#.#.#', '#..##', '#...#', '#...#'],
  Z: ['#####', '....#', '...#.', '..#..', '.#...', '#....', '#####'],
  A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  L: ['#....', '#....', '#....', '#....', '#....', '#....', '#####'],
  I: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '#####'],
  E: ['#####', '#....', '#....', '####.', '#....', '#....', '#####'],
}

// G joined to a G turned 180°: two rings sharing one bar.
export const MONOGRAM = ['.###..###.', '#...##...#', '#....#...#', '#.######.#', '#...#....#', '#...##...#', '.###..###.']

// lines of text -> bitmap rows ('#' = ink), 1 blank column between letters, 1 blank row between lines
export function rowsOf(lines) {
  const width = Math.max(...lines.map((l) => l.length * 6 - 1))
  const out = []
  lines.forEach((line, n) => {
    if (n) out.push('.'.repeat(width))
    for (let y = 0; y < 7; y++) out.push([...line].map((ch) => (GLYPHS[ch] ?? ['.....'])[y] ?? '.....').join('.').padEnd(width, '.'))
  })
  return out
}

export const cellsOf = (rows) => rows.flatMap((r, y) => [...r].flatMap((c, x) => (c === '#' ? [[x, y]] : [])))

// SVG path of the ink cells, one unit per cell
export const pathOf = (rows) => cellsOf(rows).map(([x, y]) => `M${x} ${y}h1v1h-1z`).join('')

// deterministic random so the scatter is the same on every visit
export function seeded(seed = 1) {
  let s = seed
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
}

export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
export const easeOut = (t) => 1 - Math.pow(1 - t, 4)
