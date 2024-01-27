'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

import style from './PushFoldSolver.module.scss'

import { fetchPushOrFold } from 'api/ranges'
import Vertical from 'components/layout/Vertical'
import { gtoPushFold } from 'data/gto-client'
import ButtonPosition from 'domain/buttonPosition'
import Hand from 'domain/hand'
import Move from 'domain/move'
import { heroPositionFromButtonPosition, positionsNamesMap } from 'domain/position'
import Ranges from 'src/app-components/ranges/Ranges'
import { throwError } from 'utils/throw-error'

interface Props {
  hand: Hand
  buttonPosition: ButtonPosition
}

const PushFoldSolver = ({ hand, buttonPosition }: Props) => {
  const [stack, setStack] = useState<number>(5)
  const [action, setAction] = useState<Move | null>(null)

  const hero = useMemo(() => heroPositionFromButtonPosition(buttonPosition), [buttonPosition])

  const { data: pushFoldRange = {} } = useQuery({
    queryKey: ['pushFold', hero, stack],
    queryFn: () => fetchPushOrFold(stack, hero),
  })

  throwError('oops')

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
      <Ranges range={pushFoldRange} hand={hand} />
    </Vertical>
  )
}

export default PushFoldSolver
