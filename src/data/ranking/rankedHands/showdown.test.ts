import Showdown from 'data/ranking/rankedHands/showdown'
import {Card} from 'domain/cards'
import Fullhouse from 'data/ranking/rankedHands/fullhouse'
import FourOfAKind from 'data/ranking/rankedHands/fourOfAKind'
import ThreeOfAKind from 'data/ranking/rankedHands/threeOfAKind'
import TwoPairs from 'data/ranking/rankedHands/twoPairs'
import Pair from 'data/ranking/rankedHands/pair'
import Flush from 'data/ranking/rankedHands/flush'
import Straight from 'data/ranking/rankedHands/straight'
import StraightFlush from 'data/ranking/rankedHands/straightFlush'
import High from 'data/ranking/rankedHands/high'

describe('flush', () => {
    it('is a flush', () => {
        const showdown = new Showdown(
            new Card('SPADE', 6),
            new Card('SPADE', 7),
            new Card('SPADE', 8),
            new Card('SPADE', 9),
            new Card('SPADE', 10)
        )
        expect(showdown.isFlush()).toBeTruthy()
    })
    it('is a not a flush', () => {
        const showdown = new Showdown(
            new Card('SPADE', 6),
            new Card('SPADE', 7),
            new Card('HEART', 8),
            new Card('SPADE', 9),
            new Card('SPADE', 10)
        )
        expect(showdown.isFlush()).toBeFalsy()
    })
})
describe('straight', () => {
    it('is a straight', () => {
        const showdown = new Showdown(
            new Card('SPADE', 6),
            new Card('SPADE', 7),
            new Card('SPADE', 8),
            new Card('SPADE', 9),
            new Card('SPADE', 10)
        )
        expect(showdown.isStraight()).toBeTruthy()
    })
    it('is a not a straight', () => {
        const showdown = new Showdown(
            new Card('SPADE', 6),
            new Card('SPADE', 7),
            new Card('HEART', 8),
            new Card('SPADE', 9),
            new Card('SPADE', 11)
        )
        expect(showdown.isStraight()).toBeFalsy()
    })
    it('is a straight to 5', () => {
        const showdown = new Showdown(
            new Card('SPADE', 0),
            new Card('SPADE', 2),
            new Card('HEART', 3),
            new Card('SPADE', 4),
            new Card('SPADE', 5)
        )
        expect(showdown.isStraight()).toBeTruthy()
    })
    it('is a straight to Ace', () => {
        const showdown = new Showdown(
            new Card('SPADE', 10),
            new Card('SPADE', 11),
            new Card('HEART', 12),
            new Card('SPADE', 13),
            new Card('SPADE', 0)
        )
        expect(showdown.isStraight()).toBeTruthy()
    })
    it('is a not straight to Ace', () => {
        const showdown = new Showdown(
            new Card('SPADE', 10),
            new Card('HEART', 10),
            new Card('HEART', 13),
            new Card('SPADE', 13),
            new Card('SPADE', 0)
        )
        expect(showdown.isStraight()).toBeFalsy()
    })
})

describe('Four of a kind', () => {
    it('is a foak', () => {
        const showdown = new Showdown(
            new Card('SPADE', 10),
            new Card('HEART', 10),
            new Card('DIAMOND', 10),
            new Card('CLUB', 10),
            new Card('HEART', 12)
        )
        expect(showdown.isFoak()).toBeTruthy()
    })
    it('is not a foak', () => {
        const showdown = new Showdown(
            new Card('SPADE', 10),
            new Card('HEART', 10),
            new Card('DIAMOND', 10),
            new Card('SPADE', 12),
            new Card('HEART', 12)
        )
        expect(showdown.isFoak()).toBeFalsy()
    })
})
describe('Fullhouse', () => {
    it('is a fullhouse', () => {
        const showdown = new Showdown(
            new Card('SPADE', 10),
            new Card('HEART', 10),
            new Card('DIAMOND', 10),
            new Card('CLUB', 12),
            new Card('HEART', 12)
        )
        expect(showdown.isFullHouse()).toBeTruthy()
    })
    it('is not a fullhouse', () => {
        const showdown = new Showdown(
            new Card('SPADE', 10),
            new Card('HEART', 10),
            new Card('DIAMOND', 10),
            new Card('SPADE', 10),
            new Card('HEART', 12)
        )
        expect(showdown.isFullHouse()).toBeFalsy()
    })
})

describe('Three of a kind', () => {
    it('is a Three of a kind', () => {
        const showdown = new Showdown(
            new Card('SPADE', 10),
            new Card('HEART', 10),
            new Card('DIAMOND', 10),
            new Card('CLUB', 12),
            new Card('HEART', 13)
        )
        expect(showdown.isToak()).toBeTruthy()
    })
    it('is not a Three of a kind', () => {
        const showdown = new Showdown(
            new Card('SPADE', 10),
            new Card('HEART', 10),
            new Card('DIAMOND', 10),
            new Card('SPADE', 10),
            new Card('HEART', 12)
        )
        expect(showdown.isToak()).toBeFalsy()
    })
})

describe('Two Pairs', () => {
    it('is Two Pairs', () => {
        const showdown = new Showdown(
            new Card('SPADE', 10),
            new Card('HEART', 10),
            new Card('DIAMOND', 12),
            new Card('CLUB', 12),
            new Card('HEART', 13)
        )
        expect(showdown.isTwoPairs()).toBeTruthy()
    })
    it('is not Two Pairs', () => {
        const showdown = new Showdown(
            new Card('SPADE', 10),
            new Card('HEART', 10),
            new Card('DIAMOND', 10),
            new Card('SPADE', 10),
            new Card('HEART', 12)
        )
        expect(showdown.isTwoPairs()).toBeFalsy()
    })
})

describe('One Pair', () => {
    it('is One Pair', () => {
        const showdown = new Showdown(
            new Card('SPADE', 10),
            new Card('HEART', 10),
            new Card('DIAMOND', 11),
            new Card('CLUB', 12),
            new Card('HEART', 13)
        )
        expect(showdown.isOnePair()).toBeTruthy()
    })
    it('is not One Pair', () => {
        const showdown = new Showdown(
            new Card('SPADE', 10),
            new Card('HEART', 10),
            new Card('DIAMOND', 10),
            new Card('SPADE', 10),
            new Card('HEART', 12)
        )
        expect(showdown.isOnePair()).toBeFalsy()
    })
})

describe('get ranked hand', () => {
    it('gets fullhouse', () => {
        const showdown = new Showdown(
            new Card('SPADE', 10),
            new Card('HEART', 10),
            new Card('DIAMOND', 11),
            new Card('CLUB', 11),
            new Card('HEART', 11)
        )
        const h = showdown.getRankedHand()
        expect((h as Fullhouse).value).toBe(11)
        expect((h as Fullhouse).kicker).toBe(10)
        expect((h as Fullhouse).getRank()).toBe(Fullhouse.rank)
        expect(showdown.isFullHouse()).toBeTruthy()

    })
    it('gets foak', () => {
        const showdown = new Showdown(
            new Card('SPADE', 10),
            new Card('HEART', 10),
            new Card('DIAMOND', 10),
            new Card('CLUB', 11),
            new Card('CLUB', 10)
        )
        const h = showdown.getRankedHand()
        expect((h as FourOfAKind).getRank()).toBe(FourOfAKind.rank)
        expect((h as FourOfAKind).value).toBe(10)
        expect((h as FourOfAKind).kicker).toBe(11)
        expect(showdown.isFoak()).toBeTruthy()
    })
    it('gets toak', () => {
        const showdown = new Showdown(
            new Card('SPADE', 10),
            new Card('HEART', 10),
            new Card('DIAMOND', 10),
            new Card('CLUB', 11),
            new Card('CLUB', 12)
        )
        const h = showdown.getRankedHand()
        expect((h as ThreeOfAKind).getRank()).toBe(ThreeOfAKind.rank)
        expect((h as ThreeOfAKind).value).toBe(10)
        expect((h as ThreeOfAKind).kickers).toEqual([12, 11])
        expect(showdown.isToak()).toBeTruthy()
    })
    it('gets toak with ace kicker', () => {
        const showdown = new Showdown(
            new Card('SPADE', 10),
            new Card('HEART', 10),
            new Card('DIAMOND', 10),
            new Card('CLUB', 11),
            new Card('CLUB', 0)
        )
        const h = showdown.getRankedHand()
        expect((h as ThreeOfAKind).getRank()).toBe(ThreeOfAKind.rank)
        expect((h as FourOfAKind).value).toBe(10)
        expect((h as ThreeOfAKind).kickers).toEqual([0, 11])
        expect(showdown.isToak()).toBeTruthy()
    })

    it('gets 2 pairs', () => {
        const showdown = new Showdown(
            new Card('SPADE', 10),
            new Card('HEART', 10),
            new Card('DIAMOND', 12),
            new Card('CLUB', 11),
            new Card('CLUB', 12)
        )
        const h = showdown.getRankedHand()
        expect((h as TwoPairs).getRank()).toBe(TwoPairs.rank)
        expect((h as TwoPairs).hvalue).toBe(12)
        expect((h as TwoPairs).lvalue).toBe(10)
        expect((h as TwoPairs).kicker).toBe(11)
        expect(showdown.isTwoPairs()).toBeTruthy()
    })
    it('gets 2 pairs with aces', () => {
        const showdown = new Showdown(
            new Card('SPADE', 10),
            new Card('HEART', 10),
            new Card('DIAMOND', 0),
            new Card('CLUB', 11),
            new Card('CLUB', 0)
        )
        const h = showdown.getRankedHand()
        expect((h as TwoPairs).getRank()).toBe(TwoPairs.rank)
        expect((h as TwoPairs).hvalue).toBe(0)
        expect((h as TwoPairs).lvalue).toBe(10)
        expect((h as TwoPairs).kicker).toBe(11)
        expect(showdown.isTwoPairs()).toBeTruthy()
    })
    it('gets 2 pairs with ace', () => {
        const showdown = new Showdown(
            new Card('SPADE', 10),
            new Card('HEART', 10),
            new Card('DIAMOND', 2),
            new Card('CLUB', 2),
            new Card('CLUB', 0)
        )
        const h = showdown.getRankedHand()
        expect((h as TwoPairs).getRank()).toBe(TwoPairs.rank)
        expect((h as TwoPairs).hvalue).toBe(10)
        expect((h as TwoPairs).lvalue).toBe(2)
        expect((h as TwoPairs).kicker).toBe(0)
        expect(showdown.isTwoPairs()).toBeTruthy()
    })

    it('gets 1 pair with aces', () => {
        const showdown = new Showdown(
            new Card('SPADE', 9),
            new Card('HEART', 10),
            new Card('DIAMOND', 0),
            new Card('CLUB', 11),
            new Card('CLUB', 0)
        )
        const h = showdown.getRankedHand()
        expect((h as Pair).getRank()).toBe(Pair.rank)
        expect((h as Pair).value).toBe(0)
        expect((h as Pair).kickers).toEqual([11, 10, 9])
        expect(showdown.isOnePair()).toBeTruthy()
    })
    it('gets 1 pair with ace', () => {
        const showdown = new Showdown(
            new Card('SPADE', 9),
            new Card('HEART', 10),
            new Card('DIAMOND', 9),
            new Card('CLUB', 11),
            new Card('CLUB', 0)
        )
        const h = showdown.getRankedHand()
        expect((h as Pair).getRank()).toBe(Pair.rank)
        expect((h as Pair).value).toBe(9)
        expect((h as Pair).kickers).toEqual([0, 11, 10])
        expect(showdown.isOnePair()).toBeTruthy()
    })

    it('gets flush', () => {
        const showdown = new Showdown(
            new Card('SPADE', 1),
            new Card('SPADE', 3),
            new Card('SPADE', 5),
            new Card('SPADE', 7),
            new Card('SPADE', 10)
        )
        const h = showdown.getRankedHand()
        expect((h as Flush).getRank()).toBe(Flush.rank)
        expect((h as Flush).values).toEqual([10, 7, 5, 3, 1])
        expect(showdown.isFlush()).toBeTruthy()
    })
    it('gets flush ace', () => {
        const showdown = new Showdown(
            new Card('SPADE', 1),
            new Card('SPADE', 3),
            new Card('SPADE', 5),
            new Card('SPADE', 7),
            new Card('SPADE', 0)
        )
        const h = showdown.getRankedHand()
        expect((h as Flush).getRank()).toBe(Flush.rank)
        expect((h as Flush).values).toEqual([0, 7, 5, 3, 1])
        expect(showdown.isFlush()).toBeTruthy()
    })

    it('gets straight', () => {
        const showdown = new Showdown(
            new Card('SPADE', 2),
            new Card('SPADE', 3),
            new Card('SPADE', 4),
            new Card('SPADE', 5),
            new Card('HEART', 6)
        )
        const h = showdown.getRankedHand()
        expect((h as Straight).getRank()).toBe(Straight.rank)
        expect((h as Straight).value).toBe(6)
        expect(showdown.isStraight()).toBeTruthy()
    })
    it('gets straight ace to 5', () => {
        const showdown = new Showdown(
            new Card('SPADE', 0),
            new Card('SPADE', 2),
            new Card('SPADE', 3),
            new Card('SPADE', 4),
            new Card('HEART', 5),
        )
        const h = showdown.getRankedHand()
        expect((h as Straight).getRank()).toBe(Straight.rank)
        expect((h as Straight).value).toBe(5)
        expect(showdown.isStraight()).toBeTruthy()
    })
    it('gets straight to ace', () => {
        const showdown = new Showdown(
            new Card('SPADE', 0),
            new Card('SPADE', 13),
            new Card('SPADE', 12),
            new Card('SPADE', 11),
            new Card('HEART', 10),
        )
        const h = showdown.getRankedHand()
        expect((h as Straight).getRank()).toBe(Straight.rank)
        expect((h as Straight).value).toBe(0)
        expect(showdown.isStraight()).toBeTruthy()
    })
    it('gets straight flush', () => {
        const showdown = new Showdown(
            new Card('SPADE', 2),
            new Card('SPADE', 3),
            new Card('SPADE', 4),
            new Card('SPADE', 5),
            new Card('SPADE', 6)
        )
        const h = showdown.getRankedHand()
        expect((h as StraightFlush).getRank()).toBe(StraightFlush.rank)
        expect((h as StraightFlush).value).toBe(6)
        expect(showdown.isStraight()).toBeTruthy()
        expect(showdown.isFlush()).toBeTruthy()
    })
    it('gets straight flush ace to 5', () => {
        const showdown = new Showdown(
            new Card('SPADE', 0),
            new Card('SPADE', 2),
            new Card('SPADE', 3),
            new Card('SPADE', 4),
            new Card('SPADE', 5),
        )
        const h = showdown.getRankedHand()
        expect((h as StraightFlush).getRank()).toBe(StraightFlush.rank)
        expect((h as StraightFlush).value).toBe(5)
        expect(showdown.isStraight()).toBeTruthy()
        expect(showdown.isFlush()).toBeTruthy()
    })
    it('gets straight flush to ace', () => {
        const showdown = new Showdown(
            new Card('SPADE', 0),
            new Card('SPADE', 13),
            new Card('SPADE', 12),
            new Card('SPADE', 11),
            new Card('SPADE', 10),
        )
        const h = showdown.getRankedHand()
        expect((h as StraightFlush).getRank()).toBe(StraightFlush.rank)
        expect((h as StraightFlush).value).toBe(0)
        expect(showdown.isStraight()).toBeTruthy()
        expect(showdown.isFlush()).toBeTruthy()
    })

    it('gets high', () => {
        const showdown = new Showdown(
            new Card('SPADE', 2),
            new Card('SPADE', 4),
            new Card('SPADE', 6),
            new Card('SPADE', 8),
            new Card('HEART', 10),
        )
        const h = showdown.getRankedHand()
        expect((h as High).getRank()).toBe(High.rank)
        expect((h as High).values).toEqual([10, 8, 6, 4, 2])
    })

    it('gets high to ace', () => {
        const showdown = new Showdown(
            new Card('SPADE', 2),
            new Card('SPADE', 4),
            new Card('SPADE', 0),
            new Card('SPADE', 8),
            new Card('HEART', 10),
        )
        const h = showdown.getRankedHand()
        expect((h as High).getRank()).toBe(High.rank)
        expect((h as High).values).toEqual([0, 10, 8, 4, 2])
    })
})
