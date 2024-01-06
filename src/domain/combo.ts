import { cards } from './card'

type Pair = 'AA' | 'KK' | 'QQ' | 'JJ' | 'TT' | '99' | '88' | '77' | '66' | '55' | '44' | '33' | '22'
type ComboBasic =
  | 'AK'
  | 'AQ'
  | 'AJ'
  | 'AT'
  | 'A9'
  | 'A8'
  | 'A7'
  | 'A6'
  | 'A5'
  | 'A4'
  | 'A3'
  | 'A2'
  | 'KQ'
  | 'KJ'
  | 'KT'
  | 'K9'
  | 'K8'
  | 'K7'
  | 'K6'
  | 'K5'
  | 'K4'
  | 'K3'
  | 'K2'
  | 'QJ'
  | 'QT'
  | 'Q9'
  | 'Q8'
  | 'Q7'
  | 'Q6'
  | 'Q5'
  | 'Q4'
  | 'Q3'
  | 'Q2'
  | 'JT'
  | 'J9'
  | 'J8'
  | 'J7'
  | 'J6'
  | 'J5'
  | 'J4'
  | 'J3'
  | 'J2'
  | 'T9'
  | 'T8'
  | 'T7'
  | 'T6'
  | 'T5'
  | 'T4'
  | 'T3'
  | 'T2'
  | '98'
  | '97'
  | '96'
  | '95'
  | '94'
  | '93'
  | '92'
  | '87'
  | '86'
  | '85'
  | '84'
  | '83'
  | '82'
  | '76'
  | '75'
  | '74'
  | '73'
  | '72'
  | '65'
  | '64'
  | '63'
  | '62'
  | '54'
  | '53'
  | '52'
  | '43'
  | '42'
  | '32'
export type ComboType = `${ComboBasic}s` | `${ComboBasic}o` | Pair

export default class Combo {
  constructor(readonly value: ComboType) {}

  isSuited = (): boolean => this.value.includes('s')
  isOffsuited = (): boolean => this.value.includes('o')
  isPair = (): boolean => this.value.length === 2 && this.value[0] === this.value[1]
  xyInHintTable = (): [number, number] => {
    const xy: [number, number] = [
      cards.indexOf(this.value[0].toUpperCase()),
      cards.indexOf(this.value[1].toUpperCase()),
    ]
    if (this.isOffsuited()) {
      return [xy[1], xy[0]]
    }
    return xy
  }
}
