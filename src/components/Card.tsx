import styled from 'styled-components'
import { Card as CardObject, CardId, colors, names } from 'domain/card'

import noop from 'utils/noop'

const Card = styled.div.attrs<CardsProps>(({ alt }) => ({
  alt,
}))<CardsProps>`
  box-sizing: border-box;
  // background-image: url('/images/deck.svg');
  background-repeat: no-repeat;
  background-position: ${({ colorIndex, valueIndex }) =>
    `-${5 + 50 * (valueIndex - 1)}px -${5 + 70 * (colorIndex - 1)}px`};
  width: 50px;
  height: 70px;
  margin: -10px -5px;
  transform: ${({ inHand, isOnBoard }) => (inHand || isOnBoard ? `scale(1.2)` : `scale(.75)`)};
  z-index: ${({ inHand, isOnBoard }) => (inHand || isOnBoard ? 2 : 1)};
  background-color: ${({ inHand, isOnBoard, theme }) =>
    inHand ? theme.colors.deck.inHand : isOnBoard ? theme.colors.deck.onBoard : 'none'};
  @media (max-width: 768px) {
    transform: ${({ inHand, isOnBoard }) => (inHand || isOnBoard ? `scale(.9)` : `scale(.5)`)};
    margin: -15px -12px;
  }
`

interface CardsProps {
  alt: string
  colorIndex: number
  valueIndex: number
  inHand: boolean
  isOnBoard: boolean
}

interface Props {
  card: CardObject
  inHand?: boolean
  isOnBoard?: boolean
  onClick?: (card: CardObject) => void
}

const colorIndex = [3, 2, 1, 4]
const valueIndex = (value: CardId) => (Math.floor((value - 1) / 4) + 2) % 14 || 1

// deprecated , use Card2
export const CardComponentDeprecated = ({ card, onClick = noop, inHand = false, isOnBoard = false }: Props) => {
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
      alt={cardName}
    />
  )
}
