import 'server-only'

import { useTranslations } from 'next-intl'

import style from './TrainingMenu.module.scss'

import SideMenu from 'components/layout/SideMenu/SideMenu'
import Vertical from 'components/layout/Vertical'
import LinkButton from 'components/LinkButton/LinkButton'
import { isMovePossible } from 'data/movesByPositions'
import Move, { moveToUrlParam } from 'domain/move'
import Position, { positionToUrlParam } from 'domain/position'

interface Props {
  heroPosition: Position | null
  moveType: Move | null
}

const random = 'random'
const TrainingMenu = ({ heroPosition, moveType }: Props) => {
  const t = useTranslations('training')

  return (
    <SideMenu position="left" title={t('setup.title')}>
      <Vertical className={style.moves}>
        <div>{t('setup.move')}</div>
        <LinkButton
          href={`/training/${moveToUrlParam(Move.OPEN) || random}/${positionToUrlParam(Position.B)}`}
          className={style.move}
          active={moveType === Move.OPEN}
        >
          OPEN
        </LinkButton>
        <LinkButton
          href={`/training/${moveToUrlParam(Move.CALL) || random}/${positionToUrlParam(Position.B)}`}
          className={style.move}
          active={moveType === Move.CALL}
        >
          FOLD / CALL / 3BET
        </LinkButton>
        <LinkButton
          href={`/training/${moveToUrlParam(Move.CALL3BET) || random}/${positionToUrlParam(Position.B)}`}
          className={style.move}
          active={moveType === Move.CALL3BET}
        >
          FOLD/ CALL 3BET
        </LinkButton>
        <LinkButton
          href={`/training/${random}/${positionToUrlParam(Position.B)}`}
          className={style.move}
          active={moveType === null}
        >
          {t('random')}
        </LinkButton>
      </Vertical>
      <Vertical className={style.positions}>
        <div>{t('setup.position')}</div>
        <LinkButton
          href={`/training/${moveToUrlParam(moveType) || random}/${positionToUrlParam(Position.B)}`}
          className={style.heroPosition}
          active={heroPosition === Position.B}
          disabled={!isMovePossible(moveType, Position.B)}
        >
          Button
        </LinkButton>
        <LinkButton
          href={`/training/${moveToUrlParam(moveType) || random}/${positionToUrlParam(Position.SB)}`}
          className={style.heroPosition}
          active={heroPosition === Position.SB}
          disabled={!isMovePossible(moveType, Position.SB)}
        >
          Small Blind
        </LinkButton>
        <LinkButton
          href={`/training/${moveToUrlParam(moveType) || random}/${positionToUrlParam(Position.BB)}`}
          className={style.heroPosition}
          active={heroPosition === Position.BB}
          disabled={!isMovePossible(moveType, Position.BB)}
        >
          Big Blind
        </LinkButton>
        <LinkButton
          href={`/training/${moveToUrlParam(moveType) || random}/${positionToUrlParam(Position.UTG)}`}
          className={style.heroPosition}
          active={heroPosition === Position.UTG}
          disabled={!isMovePossible(moveType, Position.UTG)}
        >
          UTG
        </LinkButton>
        <LinkButton
          href={`/training/${moveToUrlParam(moveType) || random}/${positionToUrlParam(Position.HJ)}`}
          className={style.heroPosition}
          active={heroPosition === Position.HJ}
          disabled={!isMovePossible(moveType, Position.HJ)}
        >
          HJ
        </LinkButton>
        <LinkButton
          href={`/training/${moveToUrlParam(moveType) || random}/${positionToUrlParam(Position.CO)}`}
          className={style.heroPosition}
          active={heroPosition === Position.CO}
          disabled={!isMovePossible(moveType, Position.CO)}
        >
          Cut Off
        </LinkButton>
        <LinkButton
          href={`/training/${moveToUrlParam(moveType) || random}/${random}`}
          className={style.heroPosition}
          active={heroPosition === null}
        >
          {t('random')}
        </LinkButton>
      </Vertical>
    </SideMenu>
  )
}

export default TrainingMenu
