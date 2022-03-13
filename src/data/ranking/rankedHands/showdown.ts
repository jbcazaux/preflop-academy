import {Card} from 'domain/cards'
import RankedHand from 'data/ranking/rankedHands/rankedHand'
import High from 'data/ranking/rankedHands/high'
import FourOfAKind from 'data/ranking/rankedHands/fourOfAKind'
import Fullhouse from 'data/ranking/rankedHands/fullhouse'
import ThreeOfAKind from 'data/ranking/rankedHands/threeOfAKind'
import TwoPairs from 'data/ranking/rankedHands/twoPairs'
import Pair from 'data/ranking/rankedHands/pair'
import Flush from 'data/ranking/rankedHands/flush'
import StraightFlush from 'data/ranking/rankedHands/straightFlush'
import Straight from 'data/ranking/rankedHands/straight'

export default class Showdown {
    public readonly cards: Card[]
    private occurencesByValue: { [key: number]: number }
    private kickers: ReadonlyArray<number>

    constructor(
        readonly card1: Card,
        readonly card2: Card,
        readonly card3: Card,
        readonly card4: Card,
        readonly card5: Card
    ) {
        this.cards = [this.card1, this.card2, this.card3, this.card4, this.card5]
        this.occurencesByValue = this.cards
            .map(c => c.value)
            .reduce((acc: { [key: number]: number }, cur) => ({...acc, [cur]: (acc[cur] || 0) + 1}), {})
        this.kickers = Object.entries(this.occurencesByValue)
            .filter(([, count]) => count === 1)
            .map(([value]) => parseInt(value))
            .sort((v1, v2) => (v1 === 0 ? -1 : v2 === 0 ? 1 : v2 - v1))
    }

    getRankedHand = (): RankedHand<any> => {
        const occurences = Object.values(this.occurencesByValue).sort(
            (occurences1, occurences2) => occurences2 - occurences1
        )
        if (Object.keys(this.occurencesByValue).length === 2) {
            if (occurences[0] === 4) {
                const high = Object.entries(this.occurencesByValue).find(([, count]) => count === 4)?.[0] || ''
                const kicker = Object.entries(this.occurencesByValue).find(([, count]) => count === 1)?.[0] || ''
                return new FourOfAKind(parseInt(high), parseInt(kicker))
            } else if (occurences[0] === 3) {
                const high = Object.entries(this.occurencesByValue).find(([, count]) => count === 3)?.[0] || ''
                const kicker = Object.entries(this.occurencesByValue).find(([, count]) => count === 2)?.[0] || ''
                return new Fullhouse(parseInt(high), parseInt(kicker))
            }
            throw new Error('nor foak or fullhouse')
        }
        if (Object.keys(this.occurencesByValue).length === 3) {
            if (occurences[0] === 3) {
                const high = Object.entries(this.occurencesByValue).find(([, count]) => count === 3)?.[0] || ''
                return new ThreeOfAKind(parseInt(high), this.kickers)
            } else if (occurences[0] === 2 && occurences[1] === 2) {
                const rankedPairs = Object.entries(this.occurencesByValue)
                    .filter(([, count]) => count === 2)
                    .map(([value]) => parseInt(value))
                    .sort((v1, v2) => (v1 === 0 ? -1 : v2 === 0 ? 1 : v2 - v1))
                const kicker = Object.entries(this.occurencesByValue).find(([, count]) => count === 1)?.[0] || ''
                return new TwoPairs(rankedPairs[0], rankedPairs[1], parseInt(kicker))
            }
            throw new Error('nor toak or 2pairs')
        }
        if (Object.keys(this.occurencesByValue).length === 4) {
            if (occurences[0] === 2) {
                const pair = Object.entries(this.occurencesByValue).find(([, count]) => count === 2)?.[0] || ''
                return new Pair(parseInt(pair), this.kickers)
            }
            throw new Error('not 1 pair')
        }
        if (Object.keys(this.occurencesByValue).length === 5) {
            //straight
            if (this.kickers[0] === 0) {
                if (this.kickers[1] - this.kickers[4] === 3) {
                    const high = this.kickers[1] === 5 ? 5 : 0
                    return this.isFlush() ? new StraightFlush(high) : new Straight(high)
                }
            }
            if (this.kickers[0] - this.kickers[4] === 4) {
                return this.isFlush() ? new StraightFlush(this.kickers[0]) : new Straight(this.kickers[0])
            }
            //flush
            if (this.isFlush()) {
                return new Flush(this.kickers)
            }
            return new High(this.kickers)
        }
        throw new Error('ranked hand not found')
    }

    isFlush = () => this.cards.every(c => c.color === this.card1.color)

    hasOnly1Ace = () => this.cards.filter(c => c.value === 0).length === 1

    isStraight = () => {
        if (this.kickers.length !== 5) return false
        if (this.kickers[0] - this.kickers[4] === 4) {
            return true
        }
        return this.kickers[0] === 0 && this.kickers[1] - this.kickers[4] === 3
    }

    isFoak = () => {
        if (Object.keys(this.occurencesByValue).length !== 2) return false
        const occurences = Object.values(this.occurencesByValue).sort(
            (occurences1, occurences2) => occurences2 - occurences1
        )
        return occurences[0] === 4
    }

    isFullHouse = () => {
        if (Object.keys(this.occurencesByValue).length !== 2) return false
        const occurences = Object.values(this.occurencesByValue).sort(
            (occurences1, occurences2) => occurences2 - occurences1
        )
        return occurences[0] === 3 && occurences[1] === 2
    }

    isToak = () => {
        if (Object.keys(this.occurencesByValue).length !== 3) return false
        const occurences = Object.values(this.occurencesByValue).sort(
            (occurences1, occurences2) => occurences2 - occurences1
        )
        return occurences[0] === 3 && occurences[1] === 1 && occurences[2] === 1
    }

    isTwoPairs = () => {
        if (Object.keys(this.occurencesByValue).length !== 3) return false
        const occurences = Object.values(this.occurencesByValue).sort(
            (occurences1, occurences2) => occurences2 - occurences1
        )
        return occurences[0] === 2 && occurences[1] === 2 && occurences[2] === 1
    }

    isOnePair = () => {
        if (Object.keys(this.occurencesByValue).length !== 4) return false
        const occurences = Object.values(this.occurencesByValue).sort(
            (occurences1, occurences2) => occurences2 - occurences1
        )
        return occurences[0] === 2 && occurences[1] === 1 && occurences[2] === 1 && occurences[3] === 1
    }
}
