import TwoPairs from 'data/ranking/rankedHands/twoPairs'

describe('two pairs', () => {
  it('compares 2 pairs, 1 > 2 / high pair', () => {
    const tp1 = new TwoPairs(12, 10, 8)
    const tp2 = new TwoPairs(11, 10, 8)

    expect(tp1.comparesTo(tp2)).toBeGreaterThan(0)
    expect(tp2.comparesTo(tp1)).toBeLessThan(0)
  })
  it('compares 2 pairs, 1 > 2 / high pair aces', () => {
    const tp1 = new TwoPairs(0, 10, 8)
    const tp2 = new TwoPairs(11, 10, 8)

    expect(tp1.comparesTo(tp2)).toBeGreaterThan(0)
    expect(tp2.comparesTo(tp1)).toBeLessThan(0)
  })
  it('compares 2 pairs, 1 > 2 / low pair', () => {
    const tp1 = new TwoPairs(12, 10, 8)
    const tp2 = new TwoPairs(12, 9, 8)

    expect(tp1.comparesTo(tp2)).toBeGreaterThan(0)
    expect(tp2.comparesTo(tp1)).toBeLessThan(0)
  })
  it('compares 2 pairs, 1 > 2 / kicker', () => {
    const tp1 = new TwoPairs(12, 10, 8)
    const tp2 = new TwoPairs(12, 10, 7)

    expect(tp1.comparesTo(tp2)).toBeGreaterThan(0)
    expect(tp2.comparesTo(tp1)).toBeLessThan(0)
  })
})
