import ThreeOfAKind from 'data/ranking/rankedHands/threeOfAKind'

describe('Three of a kind', () => {
  it('compares 2 toaks, 1 > 2', () => {
    const toak1 = new ThreeOfAKind(12, [8, 6])
    const toak2 = new ThreeOfAKind(11, [8, 6])

    expect(toak1.comparesTo(toak2)).toBeGreaterThan(0)
    expect(toak2.comparesTo(toak1)).toBeLessThan(0)
  })
  it('compares 2 toaks, 1 > 2, kicker 1', () => {
    const toak1 = new ThreeOfAKind(12, [8, 6])
    const toak2 = new ThreeOfAKind(12, [7, 6])

    expect(toak1.comparesTo(toak2)).toBeGreaterThan(0)
    expect(toak2.comparesTo(toak1)).toBeLessThan(0)
  })
  it('compares 2 toaks, 1 > 2, kicker 2', () => {
    const toak1 = new ThreeOfAKind(12, [8, 6])
    const toak2 = new ThreeOfAKind(12, [8, 5])

    expect(toak1.comparesTo(toak2)).toBeGreaterThan(0)
    expect(toak2.comparesTo(toak1)).toBeLessThan(0)
  })
  it('compares 2 toaks, 1 > 2, aces', () => {
    const toak1 = new ThreeOfAKind(0, [8, 6])
    const toak2 = new ThreeOfAKind(12, [8, 6])

    expect(toak1.comparesTo(toak2)).toBeGreaterThan(0)
    expect(toak2.comparesTo(toak1)).toBeLessThan(0)
  })
  it('compares 2 toaks, 1 > 2, kicker ace', () => {
    const toak1 = new ThreeOfAKind(12, [0, 6])
    const toak2 = new ThreeOfAKind(12, [8, 6])

    expect(toak1.comparesTo(toak2)).toBeGreaterThan(0)
    expect(toak2.comparesTo(toak1)).toBeLessThan(0)
  })
  it('compares 2 toaks, 1 === 2', () => {
    const toak1 = new ThreeOfAKind(12, [8, 6])
    const toak2 = new ThreeOfAKind(12, [8, 6])

    expect(toak1.comparesTo(toak2)).toBe(0)
  })
})
