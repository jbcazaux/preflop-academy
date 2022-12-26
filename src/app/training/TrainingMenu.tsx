import Position from 'domain/position'
import Move from 'domain/move'
import SideMenu from 'components/layout/SideMenu/SideMenu'
import styled from 'styled-components'
import Vertical from 'components/layout/Vertical'
import ButtonComponent from 'components/Button'
import { useNavigate } from 'react-router-dom'
import useWindowSize from 'components/useWindowSize'

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

interface Props {
  heroPosition: Position | null
  moveType: Move | null
  setMoveType: (m: Move | null) => void
}

const TrainingMenu = ({ heroPosition, moveType, setMoveType }: Props) => {
  const navigate = useNavigate()
  const { width } = useWindowSize()

  return (
    <SideMenu position="left" width={200} title="Training" pinned={width >= 1200}>
      <Positions>
        <div>Choose your position :</div>
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
        <HeroPosition onClick={() => navigate('../random')} active={heroPosition === null}>
          Random
        </HeroPosition>
      </Positions>
      <Moves>
        <div>Choose your move :</div>
        <MoveButton
          onClick={() => setMoveType(Move.OPEN)}
          active={moveType === Move.OPEN}
          disabled={!heroPosition || !isMoveTypeAllowed(Move.OPEN, heroPosition)}
        >
          OPEN
        </MoveButton>
        <MoveButton
          onClick={() => setMoveType(Move.CALL)}
          active={moveType === Move.CALL}
          disabled={!heroPosition || !isMoveTypeAllowed(Move.CALL, heroPosition)}
        >
          FOLD / CALL / 3BET
        </MoveButton>
        <MoveButton
          onClick={() => setMoveType(Move.CALL3BET)}
          active={moveType === Move.CALL3BET}
          disabled={!heroPosition || !isMoveTypeAllowed(Move.CALL3BET, heroPosition)}
        >
          FOLD/ CALL 3BET
        </MoveButton>
        <MoveButton onClick={() => setMoveType(null)} active={moveType === null}>
          RANDOM
        </MoveButton>
      </Moves>
    </SideMenu>
  )
}

export default TrainingMenu
