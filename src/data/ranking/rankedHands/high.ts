import RankedHand from 'data/ranking/rankedHands/rankedHand'
import compareValues from 'data/ranking/rankedHands/compareValues'

export default class High implements RankedHand<High> {
  constructor(readonly values: ReadonlyArray<number>) {}
  getRank = () => High.rank

  static rank = 9

  comparesTo = (other: High): number =>
      other.values.reduce((acc, v, i) => {
          if (acc !== 0) {
              return acc
          }
          return compareValues(this.values[i], v)
      }, 0)
}
