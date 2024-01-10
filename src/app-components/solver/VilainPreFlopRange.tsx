'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

import ActionComponent from 'components/Action'
import Vertical from 'components/layout/Vertical'
import { getHintsTable } from 'data/gto-client'
import Action from 'domain/action'
import ButtonPosition from 'domain/buttonPosition'
import HintTable from 'domain/hintTable'
import Position, { heroPositionFromButtonPosition, positionsNamesMap } from 'domain/position'
import Ranges from 'src/app-components/ranges/Ranges'

interface Props {
  buttonPosition: ButtonPosition
  actions: ReadonlyArray<Action>
}

const VilainPreflopRange = ({ buttonPosition, actions }: Props) => {
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
      const hintTable = await queryClient.fetchQuery({
        queryKey: ['hintsTable', vilainLastAction.move, vilainLastAction.position, hero],
        queryFn: () => getHintsTable(vilainLastAction.move, vilainLastAction.position, hero),
      })
      setVilainHintsTable(hintTable)
      setVilainAction(vilainLastAction)
    }
    effect().catch(() => {
      // FIXME: add logger
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
      {vilainHintsTable && <Ranges hintsTable={vilainHintsTable} hintsTableName={vilainAction?.move || ''} />}
    </Vertical>
  )
}

export default VilainPreflopRange
