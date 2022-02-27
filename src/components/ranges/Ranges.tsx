import React, { useState } from 'react'
import styled from 'styled-components'
import open from 'data/open'
import Position from 'domain/position'
import HintTable from 'domain/hintTable'
import call from 'data/call'
import _3bet from 'data/3bet'
import call3bet from 'data/call3bet'
import _4bet from 'data/4bet'

interface IActive {
  active: boolean
  disabled?: boolean
}

const Vertical = styled.div`
  display: flex;
  flex-direction: column;
`

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
`

const Hand = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props: IActive) => (props.active ? 'green' : 'white')};
`

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

const cards: ReadonlyArray<string> = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

enum Move {
  OPEN = 'OPEN',
  CALL = 'CALL',
  _3BET = '3BET',
  CALL3BET = 'CALL 3 BET',
  _4BET = '4 BET',
}

const getHint = (move: Move, heroPosition: Position, vilainPosition: Position): HintTable | null => {
  if (move === Move.OPEN) {
    return open.get(heroPosition) || null
  }
  if (move === Move.CALL) {
    return call.get(heroPosition)?.get(vilainPosition) || null
  }
  if (move === Move._3BET) {
    return _3bet.get(heroPosition)?.get(vilainPosition) || null
  }
  if (move === Move.CALL3BET) {
    return call3bet.get(heroPosition)?.get(vilainPosition) || null
  }
  if (move === Move._4BET) {
    return _4bet.get(heroPosition)?.get(vilainPosition) || null
  }

  return null
}

const Ranges: React.VFC = () => {
  const [heroPosition, setHeroPosition] = useState<Position>(Position.B)
  const [vilainPosition, setVilainPosition] = useState<Position>(Position.B)
  const [heroMove, setHeroMove] = useState<Move>(Move.OPEN)

  const hints = getHint(heroMove, heroPosition, vilainPosition)

  return (
    <div>
      {heroMove}
      <Vertical>
        {cards.map((c1, i) => (
          <Horizontal key={c1}>
            {cards.map((c2, j) => (
              <Hand key={`${c1}${c2}`} active={!!hints?.[i][j]}>
                {i < j ? `${c1}${c2}` : `${c2}${c1}`}
              </Hand>
            ))}
          </Horizontal>
        ))}
      </Vertical>
      <Horizontal>
        <Button onClick={() => setHeroMove(Move.OPEN)} active={heroMove === Move.OPEN}>
          {Move.OPEN}
        </Button>
        <Button onClick={() => setHeroMove(Move.CALL)} active={heroMove === Move.CALL}>
          {Move.CALL}
        </Button>
        <Button onClick={() => setHeroMove(Move._3BET)} active={heroMove === Move._3BET}>
          {Move._3BET}
        </Button>
        <Button onClick={() => setHeroMove(Move.CALL3BET)} active={heroMove === Move.CALL3BET}>
          {Move.CALL3BET}
        </Button>
        <Button onClick={() => setHeroMove(Move._4BET)} active={heroMove === Move._4BET}>
          {Move._4BET}
        </Button>
      </Horizontal>
      <Horizontal>
        <Button
          disabled={!getHint(heroMove, Position.B, vilainPosition)}
          onClick={() => setHeroPosition(Position.B)}
          active={heroPosition === Position.B}
        >
          Button
        </Button>
        <Button
          disabled={!getHint(heroMove, Position.SB, vilainPosition)}
          onClick={() => setHeroPosition(Position.SB)}
          active={heroPosition === Position.SB}
        >
          SB
        </Button>
        <Button
          disabled={!getHint(heroMove, Position.BB, vilainPosition)}
          onClick={() => setHeroPosition(Position.BB)}
          active={heroPosition === Position.BB}
        >
          BB
        </Button>
        <Button
          disabled={!getHint(heroMove, Position.UTG, vilainPosition)}
          onClick={() => setHeroPosition(Position.UTG)}
          active={heroPosition === Position.UTG}
        >
          UTG
        </Button>
        <Button
          disabled={!getHint(heroMove, Position.MP, vilainPosition)}
          onClick={() => setHeroPosition(Position.MP)}
          active={heroPosition === Position.MP}
        >
          MP
        </Button>
        <Button
          disabled={!getHint(heroMove, Position.CO, vilainPosition)}
          onClick={() => setHeroPosition(Position.CO)}
          active={heroPosition === Position.CO}
        >
          CO
        </Button>
      </Horizontal>
      <Horizontal>
        <Button
          disabled={heroMove === Move.OPEN || !getHint(heroMove, heroPosition, Position.B)}
          onClick={() => setVilainPosition(Position.B)}
          active={vilainPosition === Position.B}
        >
          Position.B
        </Button>
        <Button
          disabled={heroMove === Move.OPEN || !getHint(heroMove, heroPosition, Position.SB)}
          onClick={() => setVilainPosition(Position.SB)}
          active={vilainPosition === Position.SB}
        >
          Position.SB
        </Button>
        <Button
          disabled={heroMove === Move.OPEN || !getHint(heroMove, heroPosition, Position.BB)}
          onClick={() => setVilainPosition(Position.BB)}
          active={vilainPosition === Position.BB}
        >
          Position.BB
        </Button>
        <Button
          disabled={heroMove === Move.OPEN || !getHint(heroMove, heroPosition, Position.UTG)}
          onClick={() => setVilainPosition(Position.UTG)}
          active={vilainPosition === Position.UTG}
        >
          Position.UTG
        </Button>
        <Button
          disabled={heroMove === Move.OPEN || !getHint(heroMove, heroPosition, Position.MP)}
          onClick={() => setVilainPosition(Position.MP)}
          active={vilainPosition === Position.MP}
        >
          Position.MP
        </Button>
        <Button
          disabled={heroMove === Move.OPEN || !getHint(heroMove, heroPosition, Position.CO)}
          onClick={() => setVilainPosition(Position.CO)}
          active={vilainPosition === Position.CO}
        >
          Position.CO
        </Button>
      </Horizontal>
    </div>
  )
}

export default Ranges
