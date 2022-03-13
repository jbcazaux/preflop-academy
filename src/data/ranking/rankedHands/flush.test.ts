import Flush from 'data/ranking/rankedHands/flush'

describe('flush', () => {
  it('compares 2 flushes, 1 > 2', () => {
    const flush1 = new Flush([10, 8, 6, 4, 3])
    const flush2 = new Flush([10, 8, 6, 4, 2])

    expect(flush1.comparesTo(flush2)).toBeGreaterThan(0)
    expect(flush2.comparesTo(flush1)).toBeLessThan(0)
  })
  it('compares 2 flushes with aces, 1 > 2', () => {
    const flush1 = new Flush([0, 8, 6, 4, 2])
    const flush2 = new Flush([10, 8, 6, 4, 2])

    expect(flush1.comparesTo(flush2)).toBeGreaterThan(0)
    expect(flush2.comparesTo(flush1)).toBeLessThan(0)
  })
  it('compares 2 flushes, 1 === 2', () => {
    const flush1 = new Flush([10, 8, 6, 4, 3])
    const flush2 = new Flush([10, 8, 6, 4, 3])

    expect(flush1.comparesTo(flush2)).toBe(0)
  })
  it('compares 2 flushes with aces, 1 === 2', () => {
    const flush1 = new Flush([0, 8, 6, 4, 3])
    const flush2 = new Flush([0, 8, 6, 4, 3])

    expect(flush1.comparesTo(flush2)).toBe(0)
  })
})
