import RankedHand from 'data/ranking/rankedHands/rankedHand'
import compareValues from 'data/ranking/rankedHands/compareValues'

export default class Straight implements RankedHand<Straight> {
  constructor(readonly value: number) {}

  getRank = () => Straight.rank

  static rank = 5

  comparesTo(other: Straight): number {
    return compareValues(this.value, other.value)
  }
}
