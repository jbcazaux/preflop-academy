'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

import style from './PushFoldSolver.module.scss'

import { fetchPushOrFold } from 'api/hintTables'
import Vertical from 'components/layout/Vertical'
import { gtoPushFold } from 'data/gto-client'
import ButtonPosition from 'domain/buttonPosition'
import Hand from 'domain/hand'
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
  //const [hintsTable, setHintsTable] = useState<HintTable | null>(null)

  const hero = useMemo(() => heroPositionFromButtonPosition(buttonPosition), [buttonPosition])

  const { data: hintsTable } = useQuery({
    queryKey: ['pushFold', hero, stack],
    queryFn: () => fetchPushOrFold(stack, hero),
  })

  useEffect(() => {
    gtoPushFold(hero, hand, stack)
      .then(result => {
        setAction(result)
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.error(e)
        return
      })
  }, [hero, hand, stack])

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
      {/* <HintsToPushFold hintsTable={hintsTable} position={hero} bb={stack} /> */}
    </Vertical>
  )
}

export default PushFoldSolver
