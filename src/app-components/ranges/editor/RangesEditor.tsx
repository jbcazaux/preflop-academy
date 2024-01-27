'use client'

import { useEffect, useState } from 'react'

import PercentageOfPlayedHand from '../PercentageOfPlayedHands'

import style from './RangesEditor.module.scss'
import RangeSelector from './RangeSelector'

import Horizontal from 'components/layout/Horizontal'
import Vertical from 'components/layout/Vertical'
import RangeTable from 'components/RangeTable/RangeTable'
import { open as openRank } from 'data/rank'
import { Combo, Range, RatioRange } from 'domain/combo'

interface Props {
  defaultRange: RatioRange
  onCombosUpdate?: (r: RatioRange) => void
}

const RangesEditor = ({ onCombosUpdate, defaultRange }: Props) => {
  const [numberOfHands, setNumberOfHands] = useState<number>(() => Object.keys(defaultRange).length)
  const [range, setRange] = useState<RatioRange>(defaultRange)

  const generateCombos = () => {
    onCombosUpdate && onCombosUpdate(range)
  }

  useEffect(generateCombos, [range, onCombosUpdate])

  useEffect(() => {
    const combos: Range = openRank.slice(0, numberOfHands)
    const newRange = combos.reduce((acc, cur) => ({ ...acc, [cur]: 1 }), {})
    setRange(newRange)
  }, [defaultRange, numberOfHands])

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement
    const combo = (target.closest('div.combo') as HTMLDivElement)?.dataset.combo as Combo
    if (combo) {
      setRange(prev => {
        if (prev[combo] === 1) {
          return { ...prev, [combo]: 0 }
        }
        return { ...prev, [combo]: 1 }
      })
    }
  }

  return (
    <Horizontal>
      <Vertical className={style.vcontainer}>
        <PercentageOfPlayedHand range={range} />
        <div onClick={handleClick}>
          <RangeTable range={range} />
        </div>
        {onCombosUpdate && <RangeSelector numberOfHands={numberOfHands} setNumberOfHands={setNumberOfHands} />}
      </Vertical>
    </Horizontal>
  )
}

export default RangesEditor
