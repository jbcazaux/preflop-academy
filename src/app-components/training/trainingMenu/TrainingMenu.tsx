import 'server-only'

import Move, { moveToUrlParam } from 'domain/move'
import Position from 'domain/position'
import { useTranslations } from 'next-intl'

import SideMenu from 'components/layout/SideMenu/SideMenu'
import Vertical from 'components/layout/Vertical'
import LinkButton from 'components/LinkButton/LinkButton'

import style from './TrainingMenu.module.scss'

const isMoveTypeAllowed = (move: Move | null, hero: Position): boolean => {
  if (!move) {
    return true
  }

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

const random = 'random'
const TrainingMenu = ({ heroPosition, moveType }: Props) => {
  const t = useTranslations('training')

  return (
    <SideMenu position="left" title={t('setup.title')}>
      <Vertical className={style.moves}>
        <div>{t('setup.move')}</div>
        <LinkButton
          href={`/training/${moveToUrlParam(Move.OPEN) || random}/${Position.B}`}
          className={style.move}
          active={moveType === Move.OPEN}
        >
          OPEN
        </LinkButton>
        <LinkButton
          href={`/training/${moveToUrlParam(Move.CALL) || random}/${Position.B}`}
          className={style.move}
          active={moveType === Move.CALL}
        >
          FOLD / CALL / 3BET
        </LinkButton>
        <LinkButton
          href={`/training/${moveToUrlParam(Move.CALL3BET) || random}/${Position.B}`}
          className={style.move}
          active={moveType === Move.CALL3BET}
        >
          FOLD/ CALL 3BET
        </LinkButton>
        <LinkButton href={`/training/${random}/${Position.B}`} className={style.move} active={moveType === null}>
          {t('random')}
        </LinkButton>
      </Vertical>
      <Vertical className={style.positions}>
        <div>{t('setup.position')}</div>
        <LinkButton
          href={`/training/${moveToUrlParam(moveType) || random}/${Position.B}`}
          className={style.heroPosition}
          active={heroPosition === Position.B}
          disabled={!isMoveTypeAllowed(moveType, Position.B)}
        >
          Button
        </LinkButton>
        <LinkButton
          href={`/training/${moveToUrlParam(moveType)}/${Position.SB}`}
          className={style.heroPosition}
          active={heroPosition === Position.SB}
          disabled={!isMoveTypeAllowed(moveType, Position.SB)}
        >
          Small Blind
        </LinkButton>
        <LinkButton
          href={`/training/${moveToUrlParam(moveType)}/${Position.BB}`}
          className={style.heroPosition}
          active={heroPosition === Position.BB}
          disabled={!isMoveTypeAllowed(moveType, Position.BB)}
        >
          Big Blind
        </LinkButton>
        <LinkButton
          href={`/training/${moveToUrlParam(moveType)}/${Position.UTG}`}
          className={style.heroPosition}
          active={heroPosition === Position.UTG}
          disabled={!isMoveTypeAllowed(moveType, Position.UTG)}
        >
          UTG
        </LinkButton>
        <LinkButton
          href={`/training/${moveToUrlParam(moveType)}/${Position.MP}`}
          className={style.heroPosition}
          active={heroPosition === Position.MP}
          disabled={!isMoveTypeAllowed(moveType, Position.MP)}
        >
          HJ
        </LinkButton>
        <LinkButton
          href={`/training/${moveToUrlParam(moveType)}/${Position.CO}`}
          className={style.heroPosition}
          active={heroPosition === Position.CO}
          disabled={!isMoveTypeAllowed(moveType, Position.CO)}
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
