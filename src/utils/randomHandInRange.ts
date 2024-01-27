import { Combo, RatioRange } from 'domain/combo'
import Hand from 'domain/hand'
import Move from 'domain/move'

const randomHandInRange = (move: Move, range: RatioRange): Hand => {
  if (move === Move.OPEN) {
    let retriesLeft = 300
    let hand: Hand
    let combo: Combo
    do {
      retriesLeft--
      hand = Hand.random()
      combo = hand.asCombo()
    } while (!range[combo] && retriesLeft > 0) // FIXME improve algorithm

    if (retriesLeft <= 0) {
      throw new Error('Cannot find a hand in range')
    }
    return hand
  }
  throw new Error('Not implemented yet')
}

export default randomHandInRange
