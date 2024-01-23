'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

import { fetchHintTable } from 'api/hintTables'
import RangesEditor from 'app-components/ranges/editor/RangesEditor'
import ActionComponent from 'components/Action'
import Vertical from 'components/layout/Vertical'
import Action from 'domain/action'
import ButtonPosition from 'domain/buttonPosition'
import { Range } from 'domain/combo'
import HintTable from 'domain/hintTable'
import Move from 'domain/move'
import Position, { heroPositionFromButtonPosition, positionsNamesMap } from 'domain/position'

interface Props {
  buttonPosition: ButtonPosition
  actions: ReadonlyArray<Action>
  onVilainRangeUpdate?: (r: Range) => void
}

const VilainPreflopRange = ({ buttonPosition, actions, onVilainRangeUpdate }: Props) => {
  const [vilainHintsTable, setVilainHintsTable] = useState<HintTable | null>(null)
  const [vilainAction, setVilainAction] = useState<Action | null>(null)
  const queryClient = useQueryClient()
  const hero = useMemo<Position>(() => heroPositionFromButtonPosition(buttonPosition), [buttonPosition])

  useEffect(() => {
    const effect = async () => {
      if (actions.length === 0 || actions.every(a => a.position === hero)) {
        setVilainHintsTable(null)
        setVilainAction(null)
        return
      }

      const vilainLastAction = actions.reduce((acc: Action | null, cur) => (cur.position !== hero ? cur : acc), null)
      if (!vilainLastAction) throw new Error('can not happen')
      const heroPosition = vilainLastAction.move === Move.OPEN ? undefined : hero
      const hintTable = await queryClient.fetchQuery({
        queryKey: ['hintsTable', vilainLastAction.move, vilainLastAction.position].concat(
          heroPosition ? [heroPosition] : []
        ),
        queryFn: () => fetchHintTable(vilainLastAction.move, vilainLastAction.position, heroPosition),
      })
      setVilainHintsTable(hintTable)
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
      {vilainHintsTable && onVilainRangeUpdate && (
        <RangesEditor defaultHintsTable={vilainHintsTable} onCombosUpdate={onVilainRangeUpdate} />
      )}
    </Vertical>
  )
}

export default VilainPreflopRange
