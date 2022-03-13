import StraightFlush from 'data/ranking/rankedHands/straightFlush'

describe('StraightFlush', () => {
  it('compares 2 straights, 1 > 2', () => {
    const sf1 = new StraightFlush(8)
    const sf2 = new StraightFlush(6)

    expect(sf1.comparesTo(sf2)).toBeGreaterThan(0)
    expect(sf2.comparesTo(sf1)).toBeLessThan(0)
  })
  it('compares 2 straights with aces, 1 > 2', () => {
    const sf1 = new StraightFlush(0)
    const sf2 = new StraightFlush(5)

    expect(sf1.comparesTo(sf2)).toBeGreaterThan(0)
    expect(sf2.comparesTo(sf1)).toBeLessThan(0)
  })
  it('compares 2 straights, 1 === 2', () => {
    const sf1 = new StraightFlush(10)
    const sf2 = new StraightFlush(10)

    expect(sf1.comparesTo(sf2)).toBe(0)
  })
})
