import { useEffect, useState } from 'react'
import Training from 'app/training/Training'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import Vertical from 'components/layout/Vertical'
import ButtonComponent from 'components/Button'
import styled from 'styled-components'
import Move from 'domain/move'
import Position from 'domain/position'
import SideMenu from 'components/layout/SideMenu/SideMenu'

const Positions = styled(Vertical)`
  flex: 0;
  margin-top: 10px;
`

const Moves = styled(Vertical)`
  flex: 0;
  margin-top: 30px;
`

const HeroPosition = styled(ButtonComponent)`
  width: 150px;
  margin: 5px 0;
`

const MoveButton = styled(ButtonComponent)`
  width: 150px;
  margin: 5px 0;
`

const heroPositionFromString = new Map<string, Position>([
  ['B', Position.B],
  ['SB', Position.SB],
  ['BB', Position.BB],
  ['UTG', Position.UTG],
  ['MP', Position.MP],
  ['CO', Position.CO],
])

const isMoveTypeAllowed = (move: Move, hero: Position): boolean => {
  switch (move) {
    case Move.OPEN:
      return hero !== Position.BB
    case Move.CALL:
      return hero !== Position.UTG
    case Move.CALL3BET:
      return hero !== Position.BB
    default:
      return false
  }
}

const TrainingMapper = () => {
  const [moveType, setMoveType] = useState<Move | null>(null)
  const { position = 'B' } = useParams()
  const heroPosition: Position = heroPositionFromString.get(position.toUpperCase()) ?? Position.BB

  const navigate = useNavigate()

  useEffect(() => setMoveType(null), [heroPosition])
  return (
    <Vertical>
      <SideMenu position="left" width={200} title="Training">
        <Positions>
          <div>Choose your position : </div>
          <HeroPosition onClick={() => navigate('../B')} active={heroPosition === Position.B}>
            Button
          </HeroPosition>
          <HeroPosition onClick={() => navigate('../SB')} active={heroPosition === Position.SB}>
            Small Blind
          </HeroPosition>
          <HeroPosition onClick={() => navigate('../BB')} active={heroPosition === Position.BB}>
            Big Blind
          </HeroPosition>
          <HeroPosition onClick={() => navigate('../UTG')} active={heroPosition === Position.UTG}>
            UTG
          </HeroPosition>
          <HeroPosition onClick={() => navigate('../MP')} active={heroPosition === Position.MP}>
            Middle
          </HeroPosition>
          <HeroPosition onClick={() => navigate('../CO')} active={heroPosition === Position.CO}>
            Cut Off
          </HeroPosition>
          <HeroPosition disabled onClick={() => navigate('../random')} active={heroPosition === null}>
            Random
          </HeroPosition>
        </Positions>
        <Moves>
          <div>Choose your move : </div>
          <MoveButton
            onClick={() => setMoveType(Move.OPEN)}
            active={moveType === Move.OPEN}
            disabled={!isMoveTypeAllowed(Move.OPEN, heroPosition)}
          >
            OPEN
          </MoveButton>
          <MoveButton
            onClick={() => setMoveType(Move.CALL)}
            active={moveType === Move.CALL}
            disabled={!isMoveTypeAllowed(Move.CALL, heroPosition)}
          >
            FOLD / CALL / 3BET
          </MoveButton>
          <MoveButton
            onClick={() => setMoveType(Move.CALL3BET)}
            active={moveType === Move.CALL3BET}
            disabled={!isMoveTypeAllowed(Move.CALL3BET, heroPosition)}
          >
            FOLD/ CALL 3BET
          </MoveButton>
          <MoveButton onClick={() => setMoveType(null)} active={moveType === null}>
            RANDOM
          </MoveButton>
        </Moves>
      </SideMenu>
      <Training heroPosition={heroPosition} move={moveType} />
    </Vertical>
  )
}

const TrainingSelector = () => (
  <Routes>
    <Route path=":position" element={<TrainingMapper />} />
    <Route path="/" element={<Navigate to="B" replace />} />
  </Routes>
)

export default TrainingSelector
