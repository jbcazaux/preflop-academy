import Straight from 'data/ranking/rankedHands/straight'

describe('Straight', () => {
  it('compares 2 straights, 1 > 2', () => {
    const straight1 = new Straight(8)
    const straight2 = new Straight(6)

    expect(straight1.comparesTo(straight2)).toBeGreaterThan(0)
    expect(straight2.comparesTo(straight1)).toBeLessThan(0)
  })
  it('compares 2 straights with aces, 1 > 2', () => {
    const straight1 = new Straight(0)
    const straight2 = new Straight(5)

    expect(straight1.comparesTo(straight2)).toBeGreaterThan(0)
    expect(straight2.comparesTo(straight1)).toBeLessThan(0)
  })
  it('compares 2 straights, 1 === 2', () => {
    const straight1 = new Straight(10)
    const straight2 = new Straight(10)

    expect(straight1.comparesTo(straight2)).toBe(0)
  })
})
