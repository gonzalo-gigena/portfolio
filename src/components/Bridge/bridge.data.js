// Illustrative topology only: node count and states are simulated, not real data.
export const validators = Array.from({ length: 9 }, (_, i) => {
  const a = (i / 9) * Math.PI * 2 - Math.PI / 2
  return { id: `v${i + 1}`, x: 400 + Math.cos(a) * 128, y: 190 + Math.sin(a) * 128 }
})

export const notes = {
  chainA: 'Bridge infrastructure: transfers leave the source chain…',
  chainB: '…and are relayed to the destination chain.',
  bridge: 'Bridge contracts and relayers under observation.',
  validators: 'Validator health monitoring across the validator set.',
  monitor: 'SLA monitoring, wired into monitoring and alerting integrations.',
}
