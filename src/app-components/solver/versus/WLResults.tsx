import cn from 'classnames'

import style from './WLResults.module.scss'

import Horizontal from 'components/layout/Horizontal'
import Vertical from 'components/layout/Vertical'

const Rate = ({ rate }: { rate: number }) => <>{rate.toFixed(2)} %</>
const numberWithSeparator = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

interface Props {
  title: string
  winRate: number
  loseRate: number
  tieRate: number
  total: number
}

const WLResults = ({ title, winRate, loseRate, tieRate, total }: Props) => (
  <Vertical className={style.center}>
    <div className={style.vertical0}>
      <Horizontal>{title}</Horizontal>
      <Horizontal>
        <div className={cn(style.result, style.win)}>
          WIN: <Rate rate={winRate} />{' '}
        </div>
        <div className={cn(style.result, style.lose)}>
          LOSE: <Rate rate={loseRate} />
        </div>
      </Horizontal>
      <Horizontal>
        <div className={cn(style.result, style.tie)}>
          DRAW: <Rate rate={tieRate} />
        </div>
      </Horizontal>
      <Horizontal>
        <div className={cn(style.result, style.total)}>TOTAL: {numberWithSeparator(total)}</div>
      </Horizontal>
    </div>
  </Vertical>
)

export default WLResults
