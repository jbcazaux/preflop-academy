'use client'

import { getHintsTable } from 'data/gto'
import Move from 'domain/move'
import Position, { allPositions, positionsNamesMap } from 'domain/position'

import Button from 'components/button/Button'
import SideMenu from 'components/layout/SideMenu/SideMenu'
import Vertical from 'components/layout/Vertical'

import style from './RangesMenu.module.scss'

interface MovesProps {
  setHeroMove: (m: Move) => void
  heroMove: Move
}
const Moves = ({ setHeroMove, heroMove }: MovesProps) => (
  <>
    {[Move.OPEN, Move.CALL, Move._3BET, Move.CALL3BET, Move._4BET].map(move => (
      <Button key={move} onClick={() => setHeroMove(move)} active={heroMove === move} className={style.button}>
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
}: Props) => (
  <SideMenu position="left" title="Ranges" className={style.menu}>
    <Vertical className={style.group}>
      <div>Choose your move :</div>
      <Moves setHeroMove={setHeroMove} heroMove={heroMove} />
    </Vertical>
    <Vertical className={style.group}>
      <div>Choose your position :</div>
      {allPositions.map(position => (
        <Button
          className={style.button}
          key={position}
          disabled={!getHintsTable(heroMove, position, vilainPosition)}
          onClick={() => setHeroPosition(position)}
          active={heroPosition === position}
        >
          {positionsNamesMap.get(position) || ''}
        </Button>
      ))}
    </Vertical>
    <Vertical className={style.group}>
      <div>Choose Vilain's position :</div>
      {allPositions.map(position => (
        <Button
          className={style.button}
          key={position}
          disabled={heroMove === Move.OPEN || !getHintsTable(heroMove, heroPosition, position)}
          onClick={() => setVilainPosition(position)}
          active={vilainPosition === position}
        >
          {positionsNamesMap.get(position) || ''}
        </Button>
      ))}
    </Vertical>
  </SideMenu>
)

export default RangesMenu
