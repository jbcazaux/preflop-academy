export default class Combo {
  constructor(readonly value: string) {}

  isSuited = (): boolean => this.value.includes('s')
  isOffsuited = (): boolean => this.value.includes('o')
  isPair = (): boolean => this.value.length === 2 && this.value[0] === this.value[1]
  xyInHintTable = () => {
    const cards: ReadonlyArray<string> = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
    const xy = [cards.indexOf(this.value[0].toUpperCase()), cards.indexOf(this.value[1].toUpperCase())]
    if (this.isOffsuited()) {
      return [xy[1], xy[0]]
    }
    return xy
  }
}
