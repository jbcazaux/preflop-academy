import Move from 'domain/move'
import Hand from 'domain/hand'
import { getHintsTable } from 'data/gto'
import Position from 'domain/position'

const randomHandInRange = (move: Move, hero: Position): Hand => {
  if (move === Move.OPEN) {
    const hintsTable = getHintsTable(Move.OPEN, hero, Position.ANY)
    let retriesLeft = 300
    let hand: Hand
    let xy: [number, number]
    do {
      retriesLeft--
      hand = Hand.random()
      xy = hand.xyInRangeTable()
    } while (!hintsTable?.[xy[0]][xy[1]] && retriesLeft > 0)

    if (retriesLeft <= 0) {
      throw new Error('Cannot find a hand in range')
    }
    return hand
  }
  throw new Error('Not implemented yet')
}

export default randomHandInRange
