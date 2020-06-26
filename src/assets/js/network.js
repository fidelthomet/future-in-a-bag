export function network ({ scenarios }) {
  const crises = [...new Set(scenarios.map(s => s.crises).flat())].map(crisis => {
    return {
      name: crisis,
      x: Math.random() * 2000 - 1000,
      y: Math.random() * 2000 - 1000
    }
  })

  scenarios.forEach(s => {
    s.x = Math.random() * 2000 - 1000
    s.y = Math.random() * 2000 - 1000
  })

  return { scenarios, crises }
}
