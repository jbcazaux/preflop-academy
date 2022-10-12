import HintTable from 'domain/hintTable'

interface Props {
  hintsTable: HintTable | null
}

const PercentageOfPlayedHand = ({ hintsTable }: Props) => {
  if (!hintsTable) {
    return <div>N/A</div>
  }
  const moves = hintsTable.reduce((acc, line, i) => {
    const l = line.reduce((accLine, h, j) => {
      if (!h) return accLine
      const pair = i === j
      const suited = i < j
      if (pair) return accLine + 12
      if (suited) return accLine + 4 * 2
      return accLine + 12 * 2
    }, 0)
    return acc + l
  }, 0)
  return <div>{Number((100 * moves) / (52 * 51)).toFixed(2)}%</div>
}

export default PercentageOfPlayedHand
