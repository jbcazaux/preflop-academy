import RankedHand from 'data/ranking/rankedHands/rankedHand'
import compareValues from 'data/ranking/rankedHands/compareValues'

export default class StraightFlush implements RankedHand<StraightFlush> {
  constructor(readonly value: number) {}
  getRank = () => StraightFlush.rank

  static rank = 1

  comparesTo(other: StraightFlush): number {
    return compareValues(this.value, other.value)
  }
}
