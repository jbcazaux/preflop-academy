import {useEffect, useState} from 'react'
import Training from 'app/training/Training'
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import {useParams} from 'react-router'
import Vertical from 'components/layout/Vertical'
import ButtonComponent from 'components/Button'
import styled from 'styled-components'
import Move from 'domain/move'
import ButtonPosition from 'domain/buttonPosition'
import Position, {heroPositionByButtonPosition} from 'domain/position'
import SideMenu from 'components/layout/SideMenu/SideMenu'

const Positions = styled(Vertical)`
  flex: 0;
  margin-top: 10px;
`

const Moves = styled(Vertical)`
  flex: 0;
  margin-top: 30px;
`

const PositionButton = styled(ButtonComponent)`
  width: 150px;
  margin: 5px 0;
`

const MoveButton = styled(ButtonComponent)`
  width: 150px;
  margin: 5px 0;
`

const buttonPositionForHeroPosition = new Map<string, ButtonPosition>([
  ['B', 0],
  ['SB', 5],
  ['BB', 4],
  ['UTG', 3],
  ['MP', 2],
  ['CO', 1],
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
  const buttonPosition: ButtonPosition = buttonPositionForHeroPosition.get(position.toUpperCase()) ?? 0

  const navigate = useNavigate()

  useEffect(() => setMoveType(null), [buttonPosition])
  return (
    <Vertical>
      <SideMenu position="left" width={200} title="Training">
        <Positions>
          <div>Choose your position : </div>
          <PositionButton onClick={() => navigate('../B')} active={buttonPosition === 0}>
            Button
          </PositionButton>
          <PositionButton onClick={() => navigate('../SB')} active={buttonPosition === 5}>
            Small Blind
          </PositionButton>
          <PositionButton onClick={() => navigate('../BB')} active={buttonPosition === 4}>
            Big Blind
          </PositionButton>
          <PositionButton onClick={() => navigate('../UTG')} active={buttonPosition === 3}>
            UTG
          </PositionButton>
          <PositionButton onClick={() => navigate('../MP')} active={buttonPosition === 2}>
            Middle
          </PositionButton>
          <PositionButton onClick={() => navigate('../CO')} active={buttonPosition === 1}>
            Cut Off
          </PositionButton>
          <PositionButton disabled onClick={() => navigate('../random')} active={buttonPosition === null}>
            Random
          </PositionButton>
        </Positions>
        <Moves>
          <div>Choose your move : </div>
          <MoveButton
            onClick={() => setMoveType(Move.OPEN)}
            active={moveType === Move.OPEN}
            disabled={!isMoveTypeAllowed(Move.OPEN, heroPositionByButtonPosition(buttonPosition))}
          >
            OPEN
          </MoveButton>
          <MoveButton
            onClick={() => setMoveType(Move.CALL)}
            active={moveType === Move.CALL}
            disabled={!isMoveTypeAllowed(Move.CALL, heroPositionByButtonPosition(buttonPosition))}
          >
            FOLD / CALL / 3BET
          </MoveButton>
          <MoveButton
            onClick={() => setMoveType(Move.CALL3BET)}
            active={moveType === Move.CALL3BET}
            disabled={!isMoveTypeAllowed(Move.CALL3BET, heroPositionByButtonPosition(buttonPosition))}
          >
            FOLD/ CALL 3BET
          </MoveButton>
          <MoveButton onClick={() => setMoveType(null)} active={moveType === null}>
            RANDOM
          </MoveButton>
        </Moves>
      </SideMenu>
      <SideMenu position="right" width={200}>
        <div>Coucou</div>
      </SideMenu>
      <Training buttonPosition={buttonPosition} move={moveType} />
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
