import randomHandInRange from './randomHandInRange'

import Move from 'domain/move'

describe('randomHandInRange', () => {
  it('returns AA', () => {
    const hand = randomHandInRange(Move.OPEN, {
      AA: 1,
    })
    expect(hand.asCombo()).toBe('AA')
  })
  it('returns AKs', () => {
    const hand = randomHandInRange(Move.OPEN, {
      AKs: 1,
    })
    expect(hand.asCombo()).toBe('AKs')
  })
  it('returns not null', () => {
    const hand = randomHandInRange(Move.OPEN, {
      AA: 1,
      AKs: 1,
      AKo: 1,
    })
    expect(hand.asCombo()).not.toBeFalsy()
  })
})
