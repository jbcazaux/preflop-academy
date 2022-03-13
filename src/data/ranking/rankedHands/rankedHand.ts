interface RankedHand<T extends RankedHand<T>> {
  getRank: () => number
  comparesTo: (other: T) => number
}

export default RankedHand
