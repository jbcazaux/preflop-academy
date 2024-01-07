import cn from 'classnames'
import { ReactNode } from 'react'

import style from './ImprovementStats.module.scss'

import CardComponent from 'components/Card'
import Horizontal from 'components/layout/Horizontal'
import Vertical from 'components/layout/Vertical'
import Board from 'domain/board'
import { Card } from 'domain/card'

const Stats = ({ className, children }: { className?: string; children: ReactNode }) => (
  <div className={cn(className, style.stats)}>{children}</div>
)

interface Props {
  title: string
  cards: ReadonlyArray<Card>
  board: Board
}

const ImprovementStats = ({ title, cards, board }: Props) => {
  const odds = Number(cards.length / (52 - 2 - board.cards.length))
  return (
    <Vertical className={style.center}>
      <div className={style.vertical0}>
        <Horizontal>{title}</Horizontal>
        <Horizontal>
          <Stats>{cards.length} Outs</Stats>
          <Stats>{(100 * odds).toFixed(2)} %</Stats>
        </Horizontal>
        <Horizontal>
          <Stats className={style.betvspot}>{((100 * odds) / (1 - odds)).toFixed(2)} % Pot</Stats>
        </Horizontal>
        <Horizontal>
          <div className={style.wrap}>
            {cards.map(c => (
              <CardComponent key={c.id} card={c} />
            ))}
          </div>
        </Horizontal>
      </div>
    </Vertical>
  )
}

export default ImprovementStats
