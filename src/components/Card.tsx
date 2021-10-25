import styled from 'styled-components'
import { Color, colors, Card as CardObject, Value } from '../domain/cards'
import React from 'react'

interface CardsProps {
  colorCard: number
  value: number
  selected: boolean
  mobile: boolean
}

const Card = styled.div.attrs<CardsProps>(({ colorCard: color, value }) => ({
  alt: `${colors[color - 1]}-${value}`,
}))<CardsProps>`
  background-image: url('/images/deck.svg');
  background-repeat: no-repeat;
  background-position: ${({ colorCard: color, value }) => `-${5 + 50 * (value - 1)}px -${5 + 70 * (color - 1)}px`};
  width: 50px;
  height: 70px;
  transform: ${({ selected, mobile }) =>
    selected ? `scale(${mobile ? '1' : '1.2'})` : `scale(${mobile ? '.5' : '.75'})`};
  margin: ${({ mobile }) => (mobile ? '-10px -10px' : '-10px -5px')};
  z-index: ${({ selected }) => (selected ? 2 : 1)};
`

interface Props {
  card: CardObject
  selected: boolean
  onClick: (card: CardObject) => void
  mobile: boolean
}

const colorsIndex: { [key in Color]: number } = {
  DIAMOND: 1,
  CLUB: 4,
}

const valuesIndex = (value: Value) => value || 1

const CardComponent: React.FC<Props> = ({ card, onClick, selected, mobile }) => {
  const colorIndex = colorsIndex[card.color]
  const valueIndex = valuesIndex(card.value)
  return (
    <Card colorCard={colorIndex} value={valueIndex} onClick={() => onClick(card)} selected={selected} mobile={mobile} />
  )
}

export default React.memo(CardComponent)
