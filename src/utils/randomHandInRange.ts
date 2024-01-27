import { random, randomFrom } from './random'
import { throwError } from './throw-error'

import { Card, cardsValueMap } from 'domain/card'
import { Combo, RatioRange, isComboType } from 'domain/combo'
import Hand from 'domain/hand'
import Move from 'domain/move'

const randomHandFromCombo = (combo: Combo): Hand => {
  if (combo[2] === 's') {
    const color = randomFrom([0, 1, 2, 3])
    return new Hand(new Card(cardsValueMap[combo[0]] + color), new Card(cardsValueMap[combo[1]] + color))
  }
  const colorC1 = randomFrom([0, 1, 2])
  const colorC2 = colorC1 + 1
  return new Hand(new Card(cardsValueMap[combo[0]] + colorC1), new Card(cardsValueMap[combo[1]] + colorC2))
}

const randomHandInRange = (move: Move, range: RatioRange): Hand => {
  if (move !== Move.OPEN) {
    return throwError('Not implemented yet')
  }

  const rangeWithWeight = Object.keys(range)
    .filter(isComboType)
    .flatMap(combo => {
      if (combo[0] === combo[1]) return new Array<Combo>(6).fill(combo)
      if (combo[2] === 's') return new Array<Combo>(4).fill(combo)
      if (combo[2] === 'o') return new Array<Combo>(12).fill(combo)
      return []
    })
  const randomNumber = random(0, rangeWithWeight.length - 1)
  const randomCombo = rangeWithWeight[randomNumber]
  const randomHand = randomHandFromCombo(randomCombo)

  return randomHand
}

export default randomHandInRange
