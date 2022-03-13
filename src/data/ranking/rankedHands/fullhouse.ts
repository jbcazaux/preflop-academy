import RankedHand from 'data/ranking/rankedHands/rankedHand'
import compareValues from 'data/ranking/rankedHands/compareValues'

export default class Fullhouse implements RankedHand<Fullhouse>{
  constructor(readonly value: number, readonly kicker: number) {}
  getRank = () => Fullhouse.rank
  static rank = 3

  comparesTo = (other: Fullhouse): number => {
    if (this.value === other.value) {
      return compareValues(this.kicker, other.kicker)
    }
    return compareValues(this.value, other.value)
  }
}
