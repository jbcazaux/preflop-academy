import RankedHand from 'data/ranking/rankedHands/rankedHand'
import compareValues from 'data/ranking/rankedHands/compareValues'

export default class FourOfAKind implements RankedHand<FourOfAKind> {
  constructor(readonly value: number, readonly kicker: number) {}
  getRank = () => FourOfAKind.rank

  static rank = 2

  comparesTo = (other: FourOfAKind): number => {
    if (this.value === other.value) {
     return compareValues(this.kicker, other.kicker)
    }
    return compareValues(this.value, other.value)
  }
}
