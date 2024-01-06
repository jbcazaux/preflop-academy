import 'server-only'

import { getHintsTable } from 'data/gto'
import Move, { moveToUrlParam } from 'domain/move'
import Position, { allPositions, positionsNamesMap } from 'domain/position'
import { useTranslations } from 'next-intl'

import SideMenu from 'components/layout/SideMenu/SideMenu'
import Vertical from 'components/layout/Vertical'
import LinkButton from 'components/LinkButton/LinkButton'

import style from './RangesMenu.module.scss'

interface MovesProps {
  heroMove: Move
}
const Moves = ({ heroMove }: MovesProps) => (
  <>
    <LinkButton
      href={`/ranges/${moveToUrlParam(Move.OPEN)}/${Position.B}`}
      active={heroMove === Move.OPEN}
      className={style.button}
    >
      {Move.OPEN}
    </LinkButton>
    <LinkButton
      href={`/ranges/${moveToUrlParam(Move.CALL)}/${Position.B}/vs/${Position.UTG}`}
      active={heroMove === Move.CALL}
      className={style.button}
    >
      {Move.CALL}
    </LinkButton>
    <LinkButton
      href={`/ranges/${moveToUrlParam(Move._3BET)}/${Position.B}/vs/${Position.UTG}`}
      active={heroMove === Move._3BET}
      className={style.button}
    >
      {Move._3BET}
    </LinkButton>
    <LinkButton
      href={`/ranges/${moveToUrlParam(Move.CALL3BET)}/${Position.UTG}/vs/${Position.B}`}
      active={heroMove === Move.CALL3BET}
      className={style.button}
    >
      {Move.CALL3BET}
    </LinkButton>
    <LinkButton
      href={`/ranges/${moveToUrlParam(Move._4BET)}/${Position.UTG}/vs/${Position.B}`}
      active={heroMove === Move._4BET}
      className={style.button}
    >
      {Move._4BET}
    </LinkButton>
  </>
)

interface Props {
  heroMove: Move
  heroPosition: Position
  vilainPosition?: Position
}

const RangesMenu = ({ heroMove, heroPosition, vilainPosition }: Props) => {
  const t = useTranslations('ranges')

  return (
    <SideMenu position="left" title="Ranges">
      <Vertical className={style.group}>
        <div>{t('choose-move')}</div>
        <Moves heroMove={heroMove} />
      </Vertical>
      <Vertical className={style.group}>
        <div>{t('choose-position')}</div>
        {allPositions.map(position => {
          const link =
            Move.OPEN === heroMove
              ? `/ranges/${moveToUrlParam(heroMove)}/${position}`
              : `/ranges/${moveToUrlParam(heroMove)}/${position}/vs/${vilainPosition}`

          return (
            <LinkButton
              className={style.button}
              key={position}
              disabled={!getHintsTable(heroMove, position, vilainPosition)}
              href={link}
              active={heroPosition === position}
            >
              {positionsNamesMap.get(position) || ''}
            </LinkButton>
          )
        })}
      </Vertical>
      <Vertical className={style.group}>
        <div>{t('choose-vilain-position')}</div>
        {allPositions.map(position => (
          <LinkButton
            className={style.button}
            key={position}
            disabled={heroMove === Move.OPEN || !getHintsTable(heroMove, heroPosition, position)}
            href={`/ranges/${moveToUrlParam(heroMove)}/${heroPosition}/vs/${position}`}
            active={vilainPosition === position}
          >
            {positionsNamesMap.get(position) || ''}
          </LinkButton>
        ))}
      </Vertical>
    </SideMenu>
  )
}

export default RangesMenu
