import RankedHand from 'data/ranking/rankedHands/rankedHand'
import compareValues from 'data/ranking/rankedHands/compareValues'

export default class Flush implements RankedHand<Flush> {
    constructor(readonly values: ReadonlyArray<number>) {
    }

    getRank = () => Flush.rank
    static rank = 4

    comparesTo = (other: Flush): number =>
        other.values.reduce((acc, v, i) => {
            if (acc !== 0) {
                return acc
            }
            return compareValues(this.values[i], v)
        }, 0)
}
