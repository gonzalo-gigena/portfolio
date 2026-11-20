import { links } from '../../links.js'

export const front = { name: ['GONZALO', 'GIGENA'], line: 'Backend · Data · Infrastructure', place: 'Córdoba, AR' }
export const back = {
  line: 'Have something interesting to build?',
  rows: [
    { k: 'Email', v: links.email, copy: true },
    { k: 'GitHub', v: 'github.com/gonzalo-gigena', href: links.github },
    { k: 'LinkedIn', v: 'linkedin.com/in/gonzalo-gigena', href: links.linkedin },
    { k: 'CV', v: '[CV LINK]', href: links.cv },
  ],
}
