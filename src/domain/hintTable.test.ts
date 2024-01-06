import HintTable, { extractRange } from './hintTable'

describe('HintTable', () => {
  it('should get range Ax suited', () => {
    const hintTableAXs: HintTable = [
      [false, true, true, true, true, true, true, true, true, true, true, true, true],
      [false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false],
    ]
    const range = extractRange(hintTableAXs)

    expect(range).toEqual(['AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s'])
  })
  it('should get range Ax offsuited', () => {
    const hintTableAXo: HintTable = [
      [false, false, false, false, false, false, false, false, false, false, false, false, false],
      [true, false, false, false, false, false, false, false, false, false, false, false, false],
      [true, false, false, false, false, false, false, false, false, false, false, false, false],
      [true, false, false, false, false, false, false, false, false, false, false, false, false],
      [true, false, false, false, false, false, false, false, false, false, false, false, false],
      [true, false, false, false, false, false, false, false, false, false, false, false, false],
      [true, false, false, false, false, false, false, false, false, false, false, false, false],
      [true, false, false, false, false, false, false, false, false, false, false, false, false],
      [true, false, false, false, false, false, false, false, false, false, false, false, false],
      [true, false, false, false, false, false, false, false, false, false, false, false, false],
      [true, false, false, false, false, false, false, false, false, false, false, false, false],
      [true, false, false, false, false, false, false, false, false, false, false, false, false],
      [true, false, false, false, false, false, false, false, false, false, false, false, false],
    ]
    const range = extractRange(hintTableAXo)

    expect(range).toEqual(['AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o'])
  })

  it('should get range of pairs', () => {
    const hintTablePairs: HintTable = [
      [true, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, true, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, true, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, true, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, true, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, true, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, true, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, true, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, true, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, true, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, true, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, true, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, true],
    ]
    const range = extractRange(hintTablePairs)

    expect(range).toEqual(['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22'])
  })
})
