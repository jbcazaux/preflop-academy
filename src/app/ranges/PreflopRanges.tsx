import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import Position, {allPositions, positionsNames} from 'domain/position'
import Move from 'domain/move'
import { getHintsTable } from 'data/gto'
import PercentageOfPlayedHands from 'app/ranges/PercentageOfPlayedHands'
import RangeTable from 'components/RangeTable'
import Moves from 'app/ranges/Moves'
import Horizontal from 'components/layout/Horizontal'

interface IActive {
  active: boolean
  disabled?: boolean
}

const Action = styled.div`
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props: IActive) => (props.active ? '#2DDAEE' : 'white')};
  margin: 4px;
  opacity: ${(props: IActive) => (props.disabled ? 0.5 : 1)};
  cursor: pointer;
`

interface Props {
  disabled?: boolean
  active: boolean
  onClick: () => void
}

const Button: React.FC<Props> = ({ active, onClick, disabled = false, children }) => {
  const handleClick = () => {
    !disabled && onClick()
  }

  return (
    <Action active={!disabled && active} disabled={disabled} onClick={handleClick}>
      {children}
    </Action>
  )
}

const Ranges: React.VFC = () => {
  const [heroPosition, setHeroPosition] = useState<Position>(Position.B)
  const [vilainPosition, setVilainPosition] = useState<Position>(Position.B)
  const [heroMove, setHeroMove] = useState<Move>(Move.OPEN)

  const hintsTable = useMemo(
    () => getHintsTable(heroMove, heroPosition, vilainPosition),
    [heroMove, heroPosition, vilainPosition]
  )

  return (
    <div>
      <Horizontal>
        {heroMove}&nbsp;:&nbsp;
        <PercentageOfPlayedHands hintsTable={hintsTable} />
      </Horizontal>
      <RangeTable hintsTable={hintsTable} />
      <Horizontal>
        <Moves setHeroMove={setHeroMove} heroMove={heroMove} />
      </Horizontal>
      <Horizontal>
        {allPositions.map(position => (
          <Button
            key={position}
            disabled={!getHintsTable(heroMove, position, vilainPosition)}
            onClick={() => setHeroPosition(position)}
            active={heroPosition === position}
          >
            {positionsNames[position]}
          </Button>
        ))}
      </Horizontal>
      <Horizontal>
        {allPositions.map(position => (
          <Button
            key={position}
            disabled={heroMove === Move.OPEN || !getHintsTable(heroMove, heroPosition, position)}
            onClick={() => setVilainPosition(position)}
            active={vilainPosition === position}
          >
            {positionsNames[position]}
          </Button>
        ))}
      </Horizontal>
    </div>
  )
}

export default Ranges
