import { useEffect, useState } from 'react'
import styled from 'styled-components'
import RangeTable from 'components/RangeTable'
import HintTable from 'domain/hintTable'
import openRank from 'data/rank/open.json'
import Combo from 'domain/combo'
import RangeSelector from 'app/ranges/editor/RangeSelector'
import PercentageOfPlayedHands from 'app/ranges/PercentageOfPlayedHands'

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
`

const Vertical = styled.div`
  display: flex;
  flex-direction: column;
`
const cards: ReadonlyArray<string> = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

const combosToHint = (combos: ReadonlyArray<string>) => combos.map(combo => new Combo(combo).xyInHintTable())

const defaultTable: HintTable = new Array(13).fill('').map(() => new Array(13).fill(false))

const RangesEditor = () => {
  const [numberOfHands, setNumberOfHands] = useState<number>(0)
  const [hints, setHints] = useState<HintTable>(defaultTable)
  const [json, setJson] = useState<string>('')

  const generateTable = () => {
    const lines = cards.reduce((acc, c1, i) => {
      const line = cards
        .map((c2, j) => {
          const hand = i < j ? `${c1}${c2}` : `${c2}${c1}`
          const sop = i === j ? ' ' : i < j ? 's' : 'o'
          return `/*${hand}${sop}*/ ${hints[i][j]}`
        })
        .join(',')
      return acc.concat(`[${line}],`)
    }, '')
    setJson(`[${lines}]`)
  }

  useEffect(generateTable, [hints])

  useEffect(() => {
    const combos = openRank.slice(0, numberOfHands)
    const hintCombos = combosToHint(combos)

    setHints(
      defaultTable.map((row, rowId) => {
        const hintCombosForRowId = hintCombos.filter(hintCombo => hintCombo[0] === rowId)
        return row.map((_, cellId) => hintCombosForRowId.some(hintCombo => hintCombo[1] === cellId))
      })
    )
  }, [numberOfHands])

  const handleClick = (i: number, j: number) => {
    setHints(prev =>
      prev.map((row, rowId) => {
        if (i !== rowId) {
          return row
        }
        return row.map((value, cellId) => (j === cellId ? !value : value))
      })
    )
  }
  return (
    <Horizontal>
      <Vertical>
        <PercentageOfPlayedHands hintsTable={hints} />
        <RangeTable hintsTable={hints} onClick={handleClick} />
        <RangeSelector numberOfHands={numberOfHands} setNumberOfHands={setNumberOfHands} />
      </Vertical>
      <textarea value={json} cols={100} />
    </Horizontal>
  )
}

export default RangesEditor
