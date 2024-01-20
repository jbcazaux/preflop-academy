'use client'

import { useEffect, useState } from 'react'

import PercentageOfPlayedHand from '../PercentageOfPlayedHands'

import style from './RangesEditor.module.scss'
import RangeSelector from './RangeSelector'

import Horizontal from 'components/layout/Horizontal'
import Vertical from 'components/layout/Vertical'
import RangeTable from 'components/RangeTable/RangeTable'
import { open as openRank } from 'data/rank'
import Combo, { Range } from 'domain/combo'
import HintTable, { extractRange, HintTableRow } from 'domain/hintTable'

const combosToHint = (combos: Range): ReadonlyArray<[number, number]> =>
  combos.map(combo => new Combo(combo).xyInHintTable())

interface Props {
  defaultHintsTable: HintTable
  onCombosUpdate: (r: Range) => void
}

const RangesEditor = ({ onCombosUpdate, defaultHintsTable }: Props) => {
  const [numberOfHands, setNumberOfHands] = useState<number>(() => extractRange(defaultHintsTable).length)
  const [hintsTable, setHintsTable] = useState<HintTable>(defaultHintsTable)
  /*
  const [json, setJson] = useState<string>('')
  const [combosTxt, setCombosTxt] = useState<ReadonlyArray<ComboType>>([])
  
  const generateJson = () => {
    const lines = cards.reduce((acc, c1, i) => {
      const line = cards
        .map((c2, j) => {
          const hand = i < j ? `${c1}${c2}` : `${c2}${c1}`
          const sop = i === j ? ' ' : i < j ? 's' : 'o'
          return `/-*${hand}${sop}*-/ ${hints[i][j]}` FIXME: remove - in /-*
        })
        .join(',')
      return acc.concat(`[${line}],`)
    }, '')
    //setJson(`[${lines}]`)
  }*/

  const generateCombos = () => {
    onCombosUpdate(extractRange(hintsTable))
  }

  useEffect(generateCombos, [hintsTable, onCombosUpdate])

  useEffect(() => {
    const combos: Range = openRank.slice(0, numberOfHands)
    const hintCombos: ReadonlyArray<[number, number]> = combosToHint(combos)

    setHintsTable(
      defaultHintsTable.map((row: HintTableRow, rowId: number) => {
        const hintCombosForRowId = hintCombos.filter(hintCombo => hintCombo[0] === rowId)
        return row.map((_, cellId) => hintCombosForRowId.some(hintCombo => hintCombo[1] === cellId))
      }) as unknown as HintTable
    )
  }, [defaultHintsTable, numberOfHands])

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement
    const xy = (target.closest('div.combo') as HTMLDivElement).dataset.xy
    if (xy) {
      const x = Number(xy.split(',')[0])
      const y = Number(xy.split(',')[1])
      setHintsTable(
        prev =>
          prev.map((row, rowId) => {
            if (x !== rowId) {
              return row
            }
            return row.map((value, cellId) => (y === cellId ? !value : value))
          }) as unknown as HintTable
      )
    }
  }

  return (
    <Horizontal>
      <Vertical className={style.vcontainer}>
        <PercentageOfPlayedHand hintsTable={hintsTable} />
        <div onClick={handleClick}>
          <RangeTable hintsTable={hintsTable} />
        </div>
        <RangeSelector numberOfHands={numberOfHands} setNumberOfHands={setNumberOfHands} />
      </Vertical>
    </Horizontal>
  )
}

export default RangesEditor
