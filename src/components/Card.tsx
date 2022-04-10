import styled from 'styled-components'
import { Card as CardObject, CardId, colors, names } from 'domain/card'
import React from 'react'
import noop from 'utils/noop'

interface CardsProps {
  alt: string
  colorIndex: number
  valueIndex: number
  inHand: boolean
  isOnBoard: boolean
  mobile: boolean
}

const Card = styled.div.attrs<CardsProps>(({ alt }) => ({
  alt,
}))<CardsProps>`
  box-sizing: border-box;
  background-image: url('/images/deck.svg');
  background-repeat: no-repeat;
  background-position: ${({ colorIndex, valueIndex }) =>
    `-${5 + 50 * (valueIndex - 1)}px -${5 + 70 * (colorIndex - 1)}px`};
  width: 50px;
  height: 70px;
  transform: ${({ inHand, isOnBoard, mobile }) =>
    inHand || isOnBoard ? `scale(${mobile ? '1' : '1.2'})` : `scale(${mobile ? '.5' : '.75'})`};
  margin: ${({ mobile }) => (mobile ? '-10px -10px' : '-10px -5px')};
  z-index: ${({ inHand, isOnBoard }) => (inHand || isOnBoard ? 2 : 1)};
  background-color: ${({ inHand, isOnBoard, theme }) =>
    inHand ? theme.colors.deck.inHand : isOnBoard ? theme.colors.deck.onBoard : 'none'};
`

interface Props {
  card: CardObject
  inHand?: boolean
  isOnBoard?: boolean
  onClick?: (card: CardObject) => void
  mobile?: boolean
}

const colorIndex = [3, 2, 1, 4]
const valueIndex = (value: CardId) => (Math.floor((value - 1) / 4) + 2) % 14 || 1

const CardComponent: React.FC<Props> = ({ card, onClick = noop, inHand = false, isOnBoard = false, mobile= false }) => {
  const cIndex = colorIndex[(card.id - 1) % 4]
  const vIndex = valueIndex(card.id)
  const cardName = `${colors[(card.id - 1) % 4]}-${names[Math.floor((card.id - 1) / 4)]}`
  return (
    <Card
      colorIndex={cIndex}
      valueIndex={vIndex}
      onClick={() => onClick(card)}
      inHand={inHand}
      isOnBoard={isOnBoard}
      mobile={mobile}
      alt={cardName}
    />
  )
}

export default React.memo(CardComponent)
