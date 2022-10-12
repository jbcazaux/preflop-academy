import Vertical from 'components/layout/Vertical'
import React, { useEffect, useMemo, useState } from 'react'
import { getHeroPosition } from 'utils/playerPosition'
import { getHintsTable } from 'data/gto'
import Ranges from 'app/ranges/Ranges'
import Position, { positionsNames } from 'domain/position'
import HintTable from 'domain/hintTable'
import ActionComponent from 'components/Action'
import Action from 'domain/action'
import ButtonPosition from 'domain/buttonPosition'

interface Props {
  buttonPosition: ButtonPosition
  actions: ReadonlyArray<Action>
}

const VilainPreflopRange: React.FC<Props> = ({ buttonPosition, actions }) => {
  const [vilainHintsTable, setVilainHintsTable] = useState<HintTable | null>(null)
  const [vilainAction, setVilainAction] = useState<Action | null>(null)

  const hero = useMemo<Position>(() => getHeroPosition(buttonPosition), [buttonPosition])

  useEffect(() => {
    if (actions.length === 0 || actions.every(a => a.position === hero)) {
      setVilainHintsTable(null)
      setVilainAction(null)
      return
    }

    const vilainLastAction = actions.reduce((acc: Action | null, cur) => (cur.position !== hero ? cur : acc), null)
    if (!vilainLastAction) throw new Error('can not happen')

    setVilainHintsTable(getHintsTable(vilainLastAction.move, vilainLastAction.position, hero))
    setVilainAction(vilainLastAction)
  }, [actions, hero])

  return (
    <Vertical>
      <ActionComponent>
        {vilainAction && (
          <>
            {vilainAction.move} @ {positionsNames[vilainAction.position]}
          </>
        )}
      </ActionComponent>
      {vilainHintsTable && <Ranges hintsTable={vilainHintsTable} hintsTableName={vilainAction?.move || ''} />}
    </Vertical>
  )
}

export default VilainPreflopRange
