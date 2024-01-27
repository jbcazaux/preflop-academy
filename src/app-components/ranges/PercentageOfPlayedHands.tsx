import { Combo, RatioRange, isComboType } from 'domain/combo'

export const computePercentage = (range: RatioRange): string => {
  const playRange: ReadonlyArray<Combo> = Object.entries(range)
    .filter(([, v]) => v > 0)
    .map(([k]) => k)
    .filter(isComboType)

  const moves = playRange.reduce((acc, combo) => {
    if (combo[0] === combo[1]) return acc + 12
    if (combo[2] === 's') return acc + 4 * 2
    if (combo[2] === 'o') return acc + 12 * 2
    return acc
  }, 0)
  return Number((100 * moves) / (52 * 51)).toFixed(2)
}

interface Props {
  range: RatioRange | null
}

const PercentageOfPlayedHand = ({ range }: Props) => {
  if (!range) {
    return <div>N/A</div>
  }

  return <div>{computePercentage(range)}%</div>
}

export default PercentageOfPlayedHand
