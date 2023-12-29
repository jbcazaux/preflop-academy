import Hand from 'domain/hand'

import Card from 'components/Card'

import style from './HandDisplay.module.scss'

interface Props {
  hand: Hand
}

const HandDisplay = ({ hand }: Props) => (
  <div className={style.container}>
    {hand.card1 && <Card card={hand.card1} />}
    {hand.card2 && <Card card={hand.card2} />}
  </div>
)

export default HandDisplay
