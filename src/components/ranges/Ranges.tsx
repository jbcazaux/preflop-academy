import React, { useState } from 'react'
import styled from 'styled-components'
import Position from 'domain/position'
import Move from 'domain/move'
import { getHintsTable } from 'data/gto'
import PercentageOfPlayedHands from 'components/ranges/PercentageOfPlayedHands'
import Table from 'components/ranges/Table'
import Moves from 'components/ranges/Moves'

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
`

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

const positionsNames = ['Button', 'SB', 'BB', 'UTG', 'MP', 'CO']
const allPositions = [Position.B, Position.SB, Position.BB, Position.UTG, Position.MP, Position.CO]

const Ranges: React.VFC = () => {
  const [heroPosition, setHeroPosition] = useState<Position>(Position.B)
  const [vilainPosition, setVilainPosition] = useState<Position>(Position.B)
  const [heroMove, setHeroMove] = useState<Move>(Move.OPEN)

  return (
    <div>
      <Horizontal>
        {heroMove}&nbsp;:&nbsp;
        <PercentageOfPlayedHands hintsTable={getHintsTable(heroMove, heroPosition, vilainPosition)} />
      </Horizontal>
      <Table hero={heroPosition} vilain={vilainPosition} heroMove={heroMove} />
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
