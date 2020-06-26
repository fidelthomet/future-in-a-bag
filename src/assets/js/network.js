import { forceSimulation, forceLink, forceManyBody, forceX, forceY } from 'd3-force'
import { scaleLinear } from 'd3-scale'
export function network ({ scenarios }) {
  const crises = [...new Set(scenarios.map(s => s.crises).flat())].map(crisis => {
    return {
      name: crisis,
      type: 'crisis'
    }
  })

  scenarios.forEach(s => {
    s.type = 'scenario'
  })

  const nodes = [
    ...crises,
    ...scenarios
  ]

  const links = scenarios.map(s => {
    return [{
      source: s,
      target: crises.find(c => c.name === s.crises[0])
    }, {
      source: s,
      target: crises.find(c => c.name === s.crises[1])
    }]
  }).flat()

  const simulation = forceSimulation(nodes)
    .force('link', forceLink(links).id(d => d.id))
    .force('charge', forceManyBody())
    .force('x', forceX())
    .force('y', forceY())

  simulation.tick(1000)

  const distortFactor = scaleLinear().domain([0, Math.PI / 6, Math.PI / 3]).range([1, 0, 1])

  nodes.forEach(n => { n.activeColor = null })
  nodes.filter((n, i) => i >= 0).forEach(n => {
    const angleRadians = Math.atan2(n.y, n.x) + Math.PI / 2 + Math.PI * 2
    n.x *= 0.8 + 0.2 * distortFactor(angleRadians % (Math.PI / 3))
    n.y *= 0.8 + 0.2 * distortFactor(angleRadians % (Math.PI / 3))
  })

  return { scenarios: nodes.filter(n => n.type === 'scenario'), crises: nodes.filter(n => n.type === 'crisis'), links }
}
