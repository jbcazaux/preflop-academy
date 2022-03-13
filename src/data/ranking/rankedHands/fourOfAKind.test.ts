import FourOfAKind from 'data/ranking/rankedHands/fourOfAKind'

describe('four of a kind', () => {
  it('compares 2 foaks, 1 > 2', () => {
    const foak1 = new FourOfAKind(12, 3)
    const foak2 = new FourOfAKind(11, 2)

    expect(foak1.comparesTo(foak2)).toBeGreaterThan(0)
    expect(foak2.comparesTo(foak1)).toBeLessThan(0)
  })
  it('compares 2 foaks, 1 > 2 / kicker', () => {
    const foak1 = new FourOfAKind(12, 3)
    const foak2 = new FourOfAKind(12, 2)

    expect(foak1.comparesTo(foak2)).toBeGreaterThan(0)
    expect(foak2.comparesTo(foak1)).toBeLessThan(0)
  })
  it('compares 2 foaks, 1 > 2 with aces', () => {
    const foak1 = new FourOfAKind(0, 3)
    const foak2 = new FourOfAKind(12, 2)

    expect(foak1.comparesTo(foak2)).toBeGreaterThan(0)
    expect(foak2.comparesTo(foak1)).toBeLessThan(0)
  })
  it('compares 2 foaks, 1 > 2 with ace kicker', () => {
    const foak1 = new FourOfAKind(12, 0)
    const foak2 = new FourOfAKind(12, 2)

    expect(foak1.comparesTo(foak2)).toBeGreaterThan(0)
    expect(foak2.comparesTo(foak1)).toBeLessThan(0)
  })
  it('compares 2 foaks, 1 === 2', () => {
    const foak1 = new FourOfAKind(12, 2)
    const foak2 = new FourOfAKind(12, 2)

    expect(foak1.comparesTo(foak2)).toBe(0)
    expect(foak2.comparesTo(foak1)).toBe(0)
  })
})
