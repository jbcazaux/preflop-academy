import RankedHand from 'data/ranking/rankedHands/rankedHand'
import compareValues from 'data/ranking/rankedHands/compareValues'

export default class ThreeOfAKind implements RankedHand<ThreeOfAKind> {
  constructor(readonly value: number, readonly kickers: ReadonlyArray<number>) {}
  getRank = () => ThreeOfAKind.rank

  static rank = 6

  comparesTo(other: ThreeOfAKind): number {
    if (this.value === other.value) {
      return other.kickers.reduce((acc, v, i) => {
        if (acc !== 0) {
          return acc
        }
        return compareValues(this.kickers[i], v)
      }, 0)
    }
    return compareValues(this.value, other.value)
  }
}
