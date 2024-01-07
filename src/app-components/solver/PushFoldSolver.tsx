'use client'

import { useEffect, useState } from 'react'

import style from './PushFoldSolver.module.scss'

import { pushOrFold } from 'api/hintTables'
import Vertical from 'components/layout/Vertical'
import { gtoPushFold } from 'data/gto-client'
import ButtonPosition from 'domain/buttonPosition'
import Hand from 'domain/hand'
import HintTable from 'domain/hintTable'
import Move from 'domain/move'
import { heroPositionFromButtonPosition, positionsNamesMap } from 'domain/position'
import Ranges from 'src/app-components/ranges/Ranges'

interface Props {
  hand: Hand
  buttonPosition: ButtonPosition
}

const PushFoldSolver = ({ hand, buttonPosition }: Props) => {
  const [stack, setStack] = useState<number>(5)
  const [action, setAction] = useState<Move | null>(null)
  const [hintsTable, setHintsTable] = useState<HintTable | null>(null)

  useEffect(() => {
    const hero = heroPositionFromButtonPosition(buttonPosition)
    gtoPushFold(hero, hand, stack)
      .then(result => {
        setAction(result)
      })
      .catch(() => {
        // FIXME: add logger
      })
  }, [buttonPosition, hand, stack])

  useEffect(() => {
    const hero = heroPositionFromButtonPosition(buttonPosition)
    pushOrFold
      .get(stack, hero)
      .then(result => {
        setHintsTable(result)
      })
      .catch(() => {
        // FIXME: add logger
      })
  }, [buttonPosition, stack])

  return (
    <Vertical>
      <select className={style.select} value={stack} onChange={e => setStack(parseInt(e.target.value))}>
        {new Array(19).fill('').map((_, i) => (
          <option key={i} value={i + 2}>
            {i + 2}&nbsp;Bb
          </option>
        ))}
      </select>
      <div className={style.action}>
        PUSH/FOLD @ {positionsNamesMap.get(heroPositionFromButtonPosition(buttonPosition))}: {action}
      </div>
      {hintsTable && <Ranges hintsTable={hintsTable} hand={hand} />}
    </Vertical>
  )
}

export default PushFoldSolver
