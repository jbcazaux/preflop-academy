import Hand from 'domain/hand'
import HintTable from 'domain/hintTable'
import Move from 'domain/move'

const randomHandInRange = (move: Move, hintsTable: HintTable): Hand => {
  if (move === Move.OPEN) {
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
