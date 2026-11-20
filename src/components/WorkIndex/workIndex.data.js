// Verified public work (github.com/gonzalo-gigena). `tags` feed the expertise cross-reference.
// `art` is a small authored line drawing (SVG) that the hover preview resolves from pixels.
const frame = (body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200"><rect width="320" height="200" fill="#111"/><g fill="none" stroke="#fff" stroke-width="1.5" font-family="monospace" font-size="9" letter-spacing="1">${body}</g></svg>`

export const index = [
  {
    no: '03', name: 'Satellite pose estimation', stack: 'Python · TensorFlow', year: '2024',
    line: 'Thesis: CNNs that estimate a satellite’s pose from images.',
    href: 'https://github.com/gonzalo-gigena/satellite-image-pose-estimation',
    tags: ['Python'],
    art: frame(`<rect x="130" y="80" width="60" height="40"/><path d="M60 92h70M60 108h70M190 92h70M190 108h70M60 92v16M260 92v16M75 92v16M90 92v16M105 92v16M215 92v16M230 92v16M245 92v16"/><path d="M160 100l40-34M160 100l-46-22M160 100v52" stroke-dasharray="3 3"/><circle cx="160" cy="100" r="3" fill="#fff"/><text x="204" y="62" fill="#fff" stroke="none">Q</text><text x="18" y="186" fill="#fff" stroke="none">POSE · 6DOF</text>`),
  },
  {
    no: '04', name: 'Synthetic satellite imagery', stack: 'Python · Unity · C#', year: '2023',
    line: 'TLE-driven positions rendered in Unity as training data.',
    href: 'https://github.com/gonzalo-gigena/satellite-image-generation',
    tags: ['Python', 'Data pipelines'],
    art: frame([0, 1, 2, 3, 4, 5].map((i) => { const x = 22 + (i % 3) * 96, y = 22 + Math.floor(i / 3) * 80; return `<rect x="${x}" y="${y}" width="84" height="68"/><g transform="translate(${x + 42} ${y + 34}) rotate(${i * 28})"><rect x="-9" y="-6" width="18" height="12"/><path d="M-30 0h21M9 0h21"/></g>` }).join('') + `<text x="22" y="186" fill="#fff" stroke="none">TLE → POSITIONS → RENDER</text>`),
  },
  {
    no: '05', name: 'Spatial pyramid pooling', stack: 'Python · Keras', year: '2026',
    line: 'Optimized SPP layers for Keras, after He et al.',
    href: 'https://github.com/gonzalo-gigena/SpatialPyramidPooling',
    tags: ['Python'],
    art: frame(`<rect x="24" y="40" width="96" height="96"/><path d="M48 40v96M72 40v96M96 40v96M24 64h96M24 88h96M24 112h96"/><rect x="146" y="64" width="48" height="48"/><path d="M170 64v48M146 88h48"/><rect x="218" y="76" width="24" height="24"/><path d="M262 40v96" stroke-width="6"/><path d="M120 88h20M194 88h18M242 88h14" stroke-dasharray="2 3"/><text x="18" y="186" fill="#fff" stroke="none">4×4 · 2×2 · 1×1 → FIXED VECTOR</text>`),
  },
  {
    no: '06', name: 'Network traffic under load', stack: 'C++ · OMNeT++', year: '2023',
    line: 'Simulated networks with bounded rates and buffers, then a congestion-control fix.',
    href: 'https://github.com/gonzalo-gigena/omnet',
    tags: ['Distributed systems'],
    art: frame(`<rect x="20" y="40" width="50" height="34"/><rect x="135" y="40" width="50" height="34"/><rect x="250" y="40" width="50" height="34"/><path d="M70 57h65M185 57h65"/>${[0, 1, 2, 3].map((i) => `<rect x="${150 + i * 7}" y="80" width="5" height="5" fill="#fff"/>`).join('')}<path d="M20 160 L60 150 L100 128 L140 100 L170 96 L200 120 L240 136 L300 140"/><path d="M20 168h280" stroke-opacity=".4"/><text x="18" y="186" fill="#fff" stroke="none">BUFFER OCCUPANCY · TIME</text>`),
  },
]
