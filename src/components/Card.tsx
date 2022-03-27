import styled from 'styled-components'
import { Card as CardObject, CardId, colors, names } from 'domain/card'
import React from 'react'

interface CardsProps {
  alt: string
  colorIndex: number
  valueIndex: number
  selected: boolean
  mobile: boolean
}

const Card = styled.div.attrs<CardsProps>(({ alt }) => ({
  alt,
}))<CardsProps>`
  background-image: url('/images/deck.svg');
  background-repeat: no-repeat;
  background-position: ${({ colorIndex, valueIndex }) =>
    `-${5 + 50 * (valueIndex - 1)}px -${5 + 70 * (colorIndex - 1)}px`};
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

const colorIndex = [3, 2, 1, 4]
const valueIndex = (value: CardId) => (Math.floor((value - 1) / 4) + 2) % 14 || 1

const CardComponent: React.FC<Props> = ({ card, onClick, selected, mobile }) => {
  const cIndex = colorIndex[(card.id - 1) % 4]
  const vIndex = valueIndex(card.id)
  const cardName = `${colors[(card.id - 1) % 4]}-${names[Math.floor((card.id - 1) / 4)]}`
  return (
    <Card
      colorIndex={cIndex}
      valueIndex={vIndex}
      onClick={() => onClick(card)}
      selected={selected}
      mobile={mobile}
      alt={cardName}
    />
  )
}

export default React.memo(CardComponent)
