import Pair from 'data/ranking/rankedHands/pair'

describe('pair', () => {
  it('compares 2 pairs, 1 > 2', () => {
    const pair1 = new Pair(12, [8, 6, 3])
    const pair2 = new Pair(11, [8, 6, 3])

    expect(pair1.comparesTo(pair2)).toBeGreaterThan(0)
    expect(pair2.comparesTo(pair1)).toBeLessThan(0)
  })
  it('compares 2 pairs, 1 > 2, kicker 1', () => {
    const pair1 = new Pair(12, [8, 6, 3])
    const pair2 = new Pair(12, [7, 6, 3])

    expect(pair1.comparesTo(pair2)).toBeGreaterThan(0)
    expect(pair2.comparesTo(pair1)).toBeLessThan(0)
  })
  it('compares 2 pairs, 1 > 2, kicker 2', () => {
    const pair1 = new Pair(12, [8, 6, 3])
    const pair2 = new Pair(12, [8, 5, 3])

    expect(pair1.comparesTo(pair2)).toBeGreaterThan(0)
    expect(pair2.comparesTo(pair1)).toBeLessThan(0)
  })
  it('compares 2 pairs, 1 > 2, kicker 3', () => {
    const pair1 = new Pair(12, [8, 6, 3])
    const pair2 = new Pair(12, [8, 6, 2])

    expect(pair1.comparesTo(pair2)).toBeGreaterThan(0)
    expect(pair2.comparesTo(pair1)).toBeLessThan(0)
  })
  it('compares 2 pairs, 1 > 2, aces', () => {
    const pair1 = new Pair(0, [8, 6, 2])
    const pair2 = new Pair(12, [8, 6, 2])

    expect(pair1.comparesTo(pair2)).toBeGreaterThan(0)
    expect(pair2.comparesTo(pair1)).toBeLessThan(0)
  })
  it('compares 2 pairs, 1 > 2, kicker ace', () => {
    const pair1 = new Pair(12, [0, 6, 2])
    const pair2 = new Pair(12, [8, 6, 2])

    expect(pair1.comparesTo(pair2)).toBeGreaterThan(0)
    expect(pair2.comparesTo(pair1)).toBeLessThan(0)
  })
  it('compares 2 pairs, 1 === 2', () => {
    const pair1 = new Pair(12, [8, 6, 2])
    const pair2 = new Pair(12, [8, 6, 2])

    expect(pair1.comparesTo(pair2)).toBe(0)
  })
})
