import styled from 'styled-components'
import { Clubs, Diamonds, Heart, Spade } from 'tabler-icons-react'
import { Card as CardObject, cardValue, Color, colors, names } from 'domain/card'
import noop from 'utils/noop'
import { MouseEventHandler } from 'react'

const CardContainer = styled.div<{ inHand: boolean; onBoard: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  height: 45px;
  width: 30px;
  border: 1px solid black;
  border-radius: 5px;
  align-items: center;
  margin: 2px;
  padding: 1px;
  cursor: pointer;
  ${({ inHand, onBoard }) => (inHand || onBoard) && 'transform: scale(1.5);'}
  ${({ inHand, theme }) => inHand && `background-color: ${theme.colors.secondary};`}
  ${({ onBoard, theme }) => onBoard && `background-color: ${theme.colors.primary};`}
  @media (${({ theme }) => theme.breakpoints.max.tablet}) {
    height: 35px;
    width: 20px;
    margin: 2px;
  }
`

const CardValue = styled.div<{ color: string }>`
  font-weight: bolder;
  color: ${({ color }) => color};
  font-size: 25px;
  line-height: 20px;
  @media (${({ theme }) => theme.breakpoints.max.tablet}) {
    font-size: 18px;
    line-height: 15px;
  }
`

interface CardProps {
  title: string
  color: Color
  value: string
  inHand?: boolean
  onBoard?: boolean
  onClick: MouseEventHandler<HTMLDivElement>
}

const Card = ({ title, color: colorIndex, value, onClick, inHand = false, onBoard = false }: CardProps) => (
  <CardContainer title={title} onClick={onClick} inHand={inHand} onBoard={onBoard}>
    <CardValue color={colorIndex === 'SPADE' || colorIndex === 'CLUB' ? 'black' : 'red'}>{value}</CardValue>
    {colorIndex === 'SPADE' && <Spade fill="black" />}
    {colorIndex === 'HEART' && <Heart fill="red" stroke="red" />}
    {colorIndex === 'DIAMOND' && <Diamonds fill="red" stroke="red" />}
    {colorIndex === 'CLUB' && <Clubs fill="black" />}
  </CardContainer>
)

interface Props {
  card: CardObject
  inHand?: boolean
  isOnBoard?: boolean
  onClick?: (card: CardObject) => void
}

const CardComponent = ({ card, onClick = noop, inHand = false, isOnBoard = false }: Props) => {
  const color = colors[(card.id - 1) % 4]
  const title = `${colors[(card.id - 1) % 4]}-${names[Math.floor((card.id - 1) / 4)]}`
  return (
    <Card
      color={color}
      value={cardValue(card.id)}
      title={title}
      onClick={() => onClick(card)}
      inHand={inHand}
      onBoard={isOnBoard}
    />
  )
}

export default CardComponent
