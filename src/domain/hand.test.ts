import { Card } from 'domain/card'
import Hand from 'domain/hand'

describe('Hand', () => {
  it('finds Aces in table', () => {
    expect(new Hand(new Card(51), new Card(52)).xyInRangeTable()).toEqual([0, 0])
  })
  it('finds AKs in table', () => {
    expect(new Hand(new Card(48), new Card(52)).xyInRangeTable()).toEqual([0, 1])
  })
  it('finds AKo in table', () => {
    expect(new Hand(new Card(47), new Card(52)).xyInRangeTable()).toEqual([1, 0])
  })
  it('finds T9s in table', () => {
    expect(new Hand(new Card(33), new Card(29)).xyInRangeTable()).toEqual([4, 5])
  })
  it('finds T9o in table', () => {
    expect(new Hand(new Card(33), new Card(32)).xyInRangeTable()).toEqual([5, 4])
  })

  it('find if hand is suited', () => {
    expect(new Hand(new Card(1), new Card(49)).isSuited()).toBeTruthy()
    expect(new Hand(new Card(1), new Card(2)).isSuited()).toBeFalsy()
    expect(new Hand(null, new Card(2)).isSuited()).toBeFalsy()
  })

  it('converts to combo', () => {
    expect(new Hand(new Card(49), new Card(50)).asCombo()).toEqual('AA')
    expect(new Hand(new Card(48), new Card(49)).asCombo()).toEqual('AKo')
    expect(new Hand(new Card(48), new Card(52)).asCombo()).toEqual('AKs')
  })
})
