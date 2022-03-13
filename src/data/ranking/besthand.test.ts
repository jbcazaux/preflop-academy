import besthand from 'data/ranking/besthand'
import {Card} from 'domain/cards'
import Showdown from 'data/ranking/rankedHands/showdown'
import Hand from 'domain/hand'
import RankedHand from 'data/ranking/rankedHands/rankedHand'
import Straight from 'data/ranking/rankedHands/straight'

describe('besthand', () => {
  it('gets best hand', () => {
    const sd = new Showdown(
        new Card('CLUB', 3),
        new Card('HEART', 4),
        new Card('SPADE', 5),
        new Card('CLUB', 6),
        new Card('HEART', 7)
    )

    const hand = new Hand(new Card('HEART', 8), new Card('HEART', 9))

    const bh: RankedHand<any> = besthand(sd, hand)

    expect(bh.getRank()).toBe(Straight.rank)
  })
})