import styled from 'styled-components'
import { Clubs, Diamonds, Heart, Spade } from 'tabler-icons-react'
import { Card as CardObject, cardValue, colors, names } from 'domain/card'
import noop from 'utils/noop'
import { MouseEventHandler } from 'react'

const CardContainer = styled.div`
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
`

const CardValue = styled.div<{ color: string }>`
  font-weight: bolder;
  color: ${({ color }) => color};
  font-size: 25px;
  line-height: 20px;
`

interface CardProps {
  title: string
  colorId: number
  value: string
  inHand?: boolean
  isOnBoard?: boolean
  onClick: MouseEventHandler<HTMLDivElement>
}

const Card = ({ title, colorId: colorIndex, value, onClick }: CardProps) => (
  <CardContainer title={title} onClick={onClick}>
    <CardValue color={colorIndex === 0 || colorIndex === 3 ? 'black' : 'red'}>{value}</CardValue>
    {colorIndex === 0 && <Spade fill="black" />}
    {colorIndex === 1 && <Heart fill="red" stroke="red" />}
    {colorIndex === 2 && <Diamonds fill="red" stroke="red" />}
    {colorIndex === 3 && <Clubs fill="black" />}
  </CardContainer>
)

interface Props {
  card: CardObject
  inHand?: boolean
  isOnBoard?: boolean
  onClick?: (card: CardObject) => void
}

const CardComponent = ({ card, onClick = noop, inHand = false, isOnBoard = false }: Props) => {
  const color = (card.id - 1) % 4
  const title = `${colors[(card.id - 1) % 4]}-${names[Math.floor((card.id - 1) / 4)]}`
  return (
    <Card
      colorId={color}
      value={cardValue(card.id)}
      title={title}
      onClick={() => onClick(card)}
      inHand={inHand}
      isOnBoard={isOnBoard}
    />
  )
}

export default CardComponent
