'use client'

import { useEffect, useState } from 'react'

import PercentageOfPlayedHand from '../PercentageOfPlayedHands'

import style from './RangesEditor.module.scss'
import RangeSelector from './RangeSelector'

import Horizontal from 'components/layout/Horizontal'
import Vertical from 'components/layout/Vertical'
import RangeTable from 'components/RangeTable/RangeTable'
import { open as openRank } from 'data/rank'
import { cards } from 'domain/card'
import Combo, { ComboType } from 'domain/combo'
import HintTable, { defaultHintTable, HintTableRow } from 'domain/hintTable'

const combosToHint = (combos: ReadonlyArray<ComboType>): ReadonlyArray<[number, number]> =>
  combos.map(combo => new Combo(combo).xyInHintTable())

const RangesEditor = () => {
  const [numberOfHands, setNumberOfHands] = useState<number>(0)
  const [hints, setHints] = useState<HintTable>(defaultHintTable)
  const [json, setJson] = useState<string>('')

  const generateJson = () => {
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

  useEffect(generateJson, [hints])

  useEffect(() => {
    const combos: ReadonlyArray<ComboType> = openRank.slice(0, numberOfHands)
    const hintCombos: ReadonlyArray<[number, number]> = combosToHint(combos)

    setHints(
      defaultHintTable.map((row: HintTableRow, rowId: number) => {
        const hintCombosForRowId = hintCombos.filter(hintCombo => hintCombo[0] === rowId)
        return row.map((_, cellId) => hintCombosForRowId.some(hintCombo => hintCombo[1] === cellId))
      }) as unknown as HintTable
    )
  }, [numberOfHands])

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement
    const xy = (target.closest('div.combo') as HTMLDivElement).dataset.xy
    if (xy) {
      const x = Number(xy.split(',')[0])
      const y = Number(xy.split(',')[1])
      setHints(
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
    <Horizontal className={style.container}>
      <Vertical className={style.vcontainer}>
        <PercentageOfPlayedHand hintsTable={hints} />
        <div onClick={handleClick}>
          <RangeTable hintsTable={hints} />
        </div>
        <RangeSelector numberOfHands={numberOfHands} setNumberOfHands={setNumberOfHands} />
      </Vertical>
      <textarea value={json} cols={100} readOnly />
    </Horizontal>
  )
}

export default RangesEditor
