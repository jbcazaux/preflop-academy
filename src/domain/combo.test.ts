import Combo from 'domain/combo'

describe('combo', () => {
  it('gets xy in hintsTable', () => {
    expect(new Combo('AA').xyInHintTable()).toEqual([0, 0])
    expect(new Combo('AKs').xyInHintTable()).toEqual([0, 1])
    expect(new Combo('AKo').xyInHintTable()).toEqual([1, 0])
    expect(new Combo('22').xyInHintTable()).toEqual([12, 12])
  })
})
