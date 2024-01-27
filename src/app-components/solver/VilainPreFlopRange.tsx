'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

import { fetchRange } from 'api/ranges'
import RangesEditor from 'app-components/ranges/editor/RangesEditor'
import ActionComponent from 'components/Action'
import Vertical from 'components/layout/Vertical'
import Action from 'domain/action'
import ButtonPosition from 'domain/buttonPosition'
import { RatioRange } from 'domain/combo'
import Move from 'domain/move'
import Position, { heroPositionFromButtonPosition, positionsNamesMap } from 'domain/position'

interface Props {
  buttonPosition: ButtonPosition
  actions: ReadonlyArray<Action>
  onVilainRangeUpdate?: (r: RatioRange) => void
}

const VilainPreflopRange = ({ buttonPosition, actions, onVilainRangeUpdate }: Props) => {
  const [vilainRange, setVilainRange] = useState<RatioRange | null>(null)
  const [vilainAction, setVilainAction] = useState<Action | null>(null)
  const queryClient = useQueryClient()
  const hero = useMemo<Position>(() => heroPositionFromButtonPosition(buttonPosition), [buttonPosition])

  useEffect(() => {
    const effect = async () => {
      if (actions.length === 0 || actions.every(a => a.position === hero)) {
        setVilainRange(null)
        setVilainAction(null)
        return
      }

      const vilainLastAction = actions.reduce((acc: Action | null, cur) => (cur.position !== hero ? cur : acc), null)
      if (!vilainLastAction) throw new Error('can not happen')
      const heroPosition = vilainLastAction.move === Move.OPEN ? undefined : hero
      const vr = await queryClient.fetchQuery({
        queryKey: ['range', vilainLastAction.move, vilainLastAction.position].concat(
          heroPosition ? [heroPosition] : []
        ),
        queryFn: () => fetchRange(vilainLastAction.move, vilainLastAction.position, heroPosition),
      })
      setVilainRange(vr)
      setVilainAction(vilainLastAction)
    }
    effect().catch(e => {
      // eslint-disable-next-line no-console
      console.error(e)
    })
  }, [actions, hero, queryClient])

  return (
    <Vertical>
      <ActionComponent>
        {vilainAction && (
          <>
            {vilainAction.move} @ {positionsNamesMap.get(vilainAction.position)}
          </>
        )}
      </ActionComponent>
      {vilainRange && onVilainRangeUpdate && (
        <RangesEditor defaultRange={vilainRange} onCombosUpdate={onVilainRangeUpdate} />
      )}
    </Vertical>
  )
}

export default VilainPreflopRange
