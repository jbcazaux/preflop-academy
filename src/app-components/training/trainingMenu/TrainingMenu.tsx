'use client'

import Move from 'domain/move'
import Position from 'domain/position'
import { useRouter } from 'next/navigation'

import Button from 'components/button/Button'
import SideMenu from 'components/layout/SideMenu/SideMenu'
import Vertical from 'components/layout/Vertical'

import style from './TrainingMenu.module.scss'

const isMoveTypeAllowed = (move: Move, hero: Position): boolean => {
  switch (move) {
    case Move.OPEN:
      return hero !== Position.BB
    case Move.CALL:
      return hero !== Position.UTG
    case Move.CALL3BET:
      return hero !== Position.BB
    default:
      return false
  }
}

interface Props {
  heroPosition: Position | null
  moveType: Move | null
}

const TrainingMenu = ({ heroPosition, moveType }: Props) => {
  const router = useRouter()

  return (
    <SideMenu position="left" title="'training.setup.title'">
      <Vertical className={style.positions}>
        <div>'training.setup.position'</div>
        <Button onClick={() => router.push('./B')} active={heroPosition === Position.B} className={style.heroPosition}>
          Button
        </Button>
        <Button
          className={style.heroPosition}
          onClick={() => {
            console.log('will route to SB')
            return router.push('./SB')
          }}
          active={heroPosition === Position.SB}
        >
          Small Blind2
        </Button>
        <Button
          className={style.heroPosition}
          onClick={() => router.push('./BB')}
          active={heroPosition === Position.BB}
        >
          Big Blind
        </Button>
        <Button
          className={style.heroPosition}
          onClick={() => router.push('./UTG')}
          active={heroPosition === Position.UTG}
        >
          UTG
        </Button>
        <Button
          className={style.heroPosition}
          onClick={() => router.push('./MP')}
          active={heroPosition === Position.MP}
        >
          HJ
        </Button>
        <Button
          className={style.heroPosition}
          onClick={() => router.push('./CO')}
          active={heroPosition === Position.CO}
        >
          Cut Off
        </Button>
        <Button className={style.heroPosition} onClick={() => router.push('./random')} active={heroPosition === null}>
          Random
        </Button>
      </Vertical>
      <Vertical className={style.moves}>
        <div>'setup.move'</div>
        <Button
          className={style.move}
          onClick={() => router.push(`./${Move.OPEN}`)}
          active={moveType === Move.OPEN}
          disabled={!heroPosition || !isMoveTypeAllowed(Move.OPEN, heroPosition)}
        >
          OPEN
        </Button>
        <Button
          className={style.move}
          onClick={() => router.push(`./${Move.CALL}`)}
          active={moveType === Move.CALL}
          disabled={!heroPosition || !isMoveTypeAllowed(Move.CALL, heroPosition)}
        >
          FOLD / CALL / 3BET
        </Button>
        <Button
          className={style.move}
          onClick={() => router.push(`./${Move.CALL3BET}`)}
          active={moveType === Move.CALL3BET}
          disabled={!heroPosition || !isMoveTypeAllowed(Move.CALL3BET, heroPosition)}
        >
          FOLD/ CALL 3BET
        </Button>
        <Button className={style.move} onClick={() => router.push(`./${Move.OPEN}`)} active={moveType === null}>
          RANDOM
        </Button>
      </Vertical>
    </SideMenu>
  )
}

export default TrainingMenu
