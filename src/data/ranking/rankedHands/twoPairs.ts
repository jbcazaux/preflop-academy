import RankedHand from 'data/ranking/rankedHands/rankedHand'
import compareValues from 'data/ranking/rankedHands/compareValues'

export default class TwoPairs implements RankedHand<TwoPairs> {
  constructor(readonly hvalue: number, readonly lvalue: number, readonly kicker: number) {}

  getRank = () => TwoPairs.rank

  static rank = 7

  comparesTo(other: TwoPairs): number {
    if (this.hvalue === other.hvalue) {
      if (this.lvalue === other.lvalue) {
        return compareValues(this.kicker, other.kicker)
      }
      return compareValues(this.lvalue, other.lvalue)
    }
    return compareValues(this.hvalue, other.hvalue)
  }
}
