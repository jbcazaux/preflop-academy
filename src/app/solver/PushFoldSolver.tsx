import Vertical from 'components/layout/Vertical'
import Hand from 'domain/hand'
import { useMemo, useState } from 'react'
import { gtoPushFold } from 'data/gto'
import Ranges from 'app/ranges/Ranges'
import pushfoldHintsTable from 'data/pushfold'
import styled from 'styled-components'
import { heroPositionFromButtonPosition, positionsNamesMap } from 'domain/position'
import ButtonPosition from 'domain/buttonPosition'

const Action = styled.div`
  display: flex;
  margin: 10px 0;
  font-weight: bold;
  font-size: 2em;
`

const Select = styled.select`
  margin: 10px 0;
  width: 100px;
  font-weight: bold;
  font-size: 1em;
`

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
      <Select value={stack} onChange={e => setStack(parseInt(e.target.value))}>
        {new Array(19).fill('').map((_, i) => (
          <option key={i} value={i + 2}>
            {i + 2}&nbsp;Bb
          </option>
        ))}
      </Select>
      <Action>
        PUSH/FOLD @ {positionsNamesMap.get(heroPositionFromButtonPosition(buttonPosition))}: {action}
      </Action>
      {hintsTable && <Ranges hintsTable={hintsTable} hand={hand} />}
    </Vertical>
  )
}

export default PushFoldSolver
