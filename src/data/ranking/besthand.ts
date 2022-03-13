import Showdown from 'data/ranking/rankedHands/showdown'
import RankedHand from 'data/ranking/rankedHands/rankedHand'
import Hand from 'domain/hand'
import { Card } from 'domain/cards'

const combinations = [
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 5],
  [0, 1, 2, 3, 6],
  [0, 1, 2, 4, 5],
  [0, 1, 2, 4, 6],
  [0, 1, 2, 5, 6],
  [0, 1, 3, 4, 5],
  [0, 1, 3, 4, 6],
  [0, 1, 3, 5, 6],
  [0, 1, 4, 5, 6],
  [0, 2, 3, 4, 5],
  [0, 2, 3, 4, 6],
  [0, 2, 3, 5, 6],
  [0, 2, 4, 5, 6],
  [0, 3, 4, 5, 6],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 6],
  [1, 2, 3, 5, 6],
  [1, 2, 4, 5, 6],
  [1, 3, 4, 5, 6],
  [2, 3, 4, 5, 6],
]

const besthand = (showdown: Showdown, hand: Hand) => {
  const cards = [...showdown.cards, hand.card1, hand.card2]
  const winners = combinations
    .map(
      c =>
        new Showdown(
          cards[c[0]] as Card,
          cards[c[1]] as Card,
          cards[c[2]] as Card,
          cards[c[3]] as Card,
          cards[c[4]] as Card
        )
    )
    .map(s => s.getRankedHand())
    .reduce((acc: ReadonlyArray<RankedHand<any>>, cur) => {
      if (acc.length === 0) {
        return [cur]
      }
      if (acc[0].getRank() > cur.getRank()) {
        return [cur]
      }
      if (acc[0].getRank() === cur.getRank()) {
        return acc.concat(cur)
      }
      return acc
    }, [])
    .concat()
    .sort((w1, w2) => w2.comparesTo(w1))
  return winners[0]
}

export default besthand
