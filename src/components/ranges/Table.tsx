import React from 'react'
import styled from 'styled-components'
import { getHintsTable } from 'data/gto'
import Move from 'domain/move'
import Position from 'domain/position'

const Vertical = styled.div`
  display: flex;
  flex-direction: column;
`

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
`

interface ISquare {
  bgColor: string
  active: boolean
}
const Square = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props: ISquare) => props.bgColor};
  opacity: ${(props: ISquare) => (props.active ? 1 : 0.6)};
  margin: 1px;
  border: 1px solid black;
  border-radius: 3px;
`
interface HandProps {
  active: boolean
  pair: boolean
  suited: boolean
}
const Hand: React.FC<HandProps> = ({ active, suited, pair, children }) => {
  const color = active ? '#97DE5D' : suited || pair ? '#0CF9DF' : '#F9E00C'
  return (
    <Square bgColor={color} active={active}>
      {children}
      {pair ? '' : suited ? 's' : 'o'}
    </Square>
  )
}
const cards: ReadonlyArray<string> = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

interface Props {
  heroMove: Move
  hero: Position
  vilain: Position
}
const Table: React.FC<Props> = ({ heroMove, hero, vilain }) => {
  const hints = getHintsTable(heroMove, hero, vilain)
  return (
    <Vertical>
      {cards.map((c1, i) => (
        <Horizontal key={c1}>
          {cards.map((c2, j) => (
            <Hand key={`${c1}${c2}`} active={!!hints?.[i][j]} suited={i < j} pair={i === j}>
              {i < j ? `${c1}${c2}` : `${c2}${c1}`}
            </Hand>
          ))}
        </Horizontal>
      ))}
    </Vertical>
  )
}

export default Table
