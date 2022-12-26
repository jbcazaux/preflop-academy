import Position, { allPositions, positionsNamesMap } from 'domain/position'
import { getHintsTable } from 'data/gto'
import Move from 'domain/move'
import SideMenu from 'components/layout/SideMenu/SideMenu'
import styled from 'styled-components'
import ButtonComponent from 'components/Button'
import Vertical from 'components/layout/Vertical'
import useWindowSize from 'components/useWindowSize'

const Button = styled(ButtonComponent)`
  width: 175px;
  margin: 5px 0;
`

const Group = styled(Vertical)`
  flex: 0;
  margin-top: 10px;
`

interface MovesProps {
  setHeroMove: (m: Move) => void
  heroMove: Move
}
const Moves = ({ setHeroMove, heroMove }: MovesProps) => (
  <>
    {[Move.OPEN, Move.CALL, Move._3BET, Move.CALL3BET, Move._4BET].map(move => (
      <Button key={move} onClick={() => setHeroMove(move)} active={heroMove === move}>
        {move}
      </Button>
    ))}
  </>
)

interface Props {
  heroMove: Move
  setHeroMove: (move: Move) => void
  heroPosition: Position
  setHeroPosition: (p: Position) => void
  vilainPosition: Position
  setVilainPosition: (p: Position) => void
}

const RangesMenu = ({
  heroMove,
  setHeroMove,
  heroPosition,
  setHeroPosition,
  vilainPosition,
  setVilainPosition,
}: Props) => {
  const { width } = useWindowSize()

  return (
    <SideMenu position="left" width={250} pinned={width >= 600} title="Ranges">
      <Group>
        <div>Choose your move :</div>
        <Moves setHeroMove={setHeroMove} heroMove={heroMove} />
      </Group>
      <Group>
        <div>Choose your position :</div>
        {allPositions.map(position => (
          <Button
            key={position}
            disabled={!getHintsTable(heroMove, position, vilainPosition)}
            onClick={() => setHeroPosition(position)}
            active={heroPosition === position}
          >
            {positionsNamesMap.get(position) || ''}
          </Button>
        ))}
      </Group>
      <Group>
        <div>Choose Vilain's position :</div>
        {allPositions.map(position => (
          <Button
            key={position}
            disabled={heroMove === Move.OPEN || !getHintsTable(heroMove, heroPosition, position)}
            onClick={() => setVilainPosition(position)}
            active={vilainPosition === position}
          >
            {positionsNamesMap.get(position) || ''}
          </Button>
        ))}
      </Group>
    </SideMenu>
  )
}

export default RangesMenu
