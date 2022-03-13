import Fullhouse from 'data/ranking/rankedHands/fullhouse'

describe('full house', () => {
  it('compares 2 fullhouses, 1 > 2', () => {
    const fh1 = new Fullhouse(12, 3)
    const fh2 = new Fullhouse(11, 2)

    expect(fh1.comparesTo(fh2)).toBeGreaterThan(0)
    expect(fh2.comparesTo(fh1)).toBeLessThan(0)
  })
  it('compares 2 fullhouses, 1 > 2 / kicker', () => {
    const fh1 = new Fullhouse(12, 3)
    const fh2 = new Fullhouse(12, 2)

    expect(fh1.comparesTo(fh2)).toBeGreaterThan(0)
    expect(fh2.comparesTo(fh1)).toBeLessThan(0)
  })
  it('compares 2 fullhouses, 1 > 2 with aces', () => {
    const fh1 = new Fullhouse(0, 3)
    const fh2 = new Fullhouse(12, 2)

    expect(fh1.comparesTo(fh2)).toBeGreaterThan(0)
    expect(fh2.comparesTo(fh1)).toBeLessThan(0)
  })
  it('compares 2 fullhouses, 1 > 2 with ace kicker', () => {
    const fh1 = new Fullhouse(12, 0)
    const fh2 = new Fullhouse(12, 2)

    expect(fh1.comparesTo(fh2)).toBeGreaterThan(0)
    expect(fh2.comparesTo(fh1)).toBeLessThan(0)
  })
  it('compares 2 fullhouses, 1 === 2', () => {
    const fh1 = new Fullhouse(12, 2)
    const fh2 = new Fullhouse(12, 2)

    expect(fh1.comparesTo(fh2)).toBe(0)
    expect(fh2.comparesTo(fh1)).toBe(0)
  })
})
