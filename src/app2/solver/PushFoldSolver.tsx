'use client'

import Vertical from 'components/layout/Vertical'
import Hand from 'domain/hand'
import { useMemo, useState } from 'react'
import { gtoPushFold } from 'data/gto'
import pushfoldHintsTable from 'data/pushfold'
import style from './PushFoldSolver.module.scss'
import { heroPositionFromButtonPosition, positionsNamesMap } from 'domain/position'
import ButtonPosition from 'domain/buttonPosition'
import Ranges from 'src/app-components/ranges/Ranges'

interface Props {
  hand: Hand
  buttonPosition: ButtonPosition
}

const PushFoldSolver = ({ hand, buttonPosition }: Props) => {
  const [stack, setStack] = useState<number>(5)

  const action = useMemo(() => {
    const hero = heroPositionFromButtonPosition(buttonPosition)
    return gtoPushFold(hero, hand, stack)
  }, [buttonPosition, hand, stack])

  const hintsTable = useMemo(() => {
    const hero = heroPositionFromButtonPosition(buttonPosition)
    return pushfoldHintsTable(hero, stack)
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
