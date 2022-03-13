import High from 'data/ranking/rankedHands/high'

describe('High', () => {
  it('compares 2 Highs, 1 > 2', () => {
    const High1 = new High([10, 8, 6, 4, 3])
    const High2 = new High([10, 8, 6, 4, 2])

    expect(High1.comparesTo(High2)).toBeGreaterThan(0)
    expect(High2.comparesTo(High1)).toBeLessThan(0)
  })
  it('compares 2 Highs with aces, 1 > 2', () => {
    const High1 = new High([0, 8, 6, 4, 2])
    const High2 = new High([10, 8, 6, 4, 2])

    expect(High1.comparesTo(High2)).toBeGreaterThan(0)
    expect(High2.comparesTo(High1)).toBeLessThan(0)
  })
  it('compares 2 Highs, 1 === 2', () => {
    const High1 = new High([10, 8, 6, 4, 3])
    const High2 = new High([10, 8, 6, 4, 3])

    expect(High1.comparesTo(High2)).toBe(0)
  })
  it('compares 2 Highs with aces, 1 === 2', () => {
    const High1 = new High([0, 8, 6, 4, 3])
    const High2 = new High([0, 8, 6, 4, 3])

    expect(High1.comparesTo(High2)).toBe(0)
  })
})
