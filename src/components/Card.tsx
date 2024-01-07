import classNames from 'classnames'
import { MouseEventHandler } from 'react'
import { Clubs, Diamonds, Heart, Spade } from 'tabler-icons-react'

import style from './Card.module.scss'

import { Card as CardObject, cardValue, Color, colors, names } from 'domain/card'
import noop from 'utils/noop'

interface CardProps {
  title: string
  color: Color
  value: string
  inHand?: boolean
  inBoard?: boolean
  onClick: MouseEventHandler<HTMLDivElement>
}

const Card = ({ title, color: colorIndex, value, onClick, inHand = false, inBoard = false }: CardProps) => (
  <div
    className={classNames(style.container, {
      [style.inHand]: inHand,
      [style.inBoard]: inBoard,
    })}
    title={title}
    onClick={onClick}
  >
    <div
      className={classNames(style['card-value'], {
        [style.spade]: colorIndex === 'SPADE',
        [style.heart]: colorIndex === 'HEART',
        [style.diamond]: colorIndex === 'DIAMOND',
        [style.club]: colorIndex === 'CLUB',
      })}
    >
      {value}
    </div>
    <div
      className={classNames(style.icon, {
        [style.spade]: colorIndex === 'SPADE',
        [style.heart]: colorIndex === 'HEART',
        [style.diamond]: colorIndex === 'DIAMOND',
        [style.club]: colorIndex === 'CLUB',
      })}
    >
      {colorIndex === 'SPADE' && <Spade />}
      {colorIndex === 'HEART' && <Heart />}
      {colorIndex === 'DIAMOND' && <Diamonds />}
      {colorIndex === 'CLUB' && <Clubs />}
    </div>
  </div>
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
      inBoard={isOnBoard}
    />
  )
}

export default CardComponent
