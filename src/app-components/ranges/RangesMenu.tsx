import 'server-only'

import { useTranslations } from 'next-intl'

import style from './RangesMenu.module.scss'

import SideMenu from 'components/layout/SideMenu/SideMenu'
import Vertical from 'components/layout/Vertical'
import LinkButton from 'components/LinkButton/LinkButton'
import { isMoveAllowed } from 'data/movesByPositions'
import Move, { moveToUrlParam } from 'domain/move'
import Position, { allPositions, positionsNamesMap, positionToUrlParam } from 'domain/position'

interface MovesProps {
  heroMove: Move
}
const Moves = ({ heroMove }: MovesProps) => (
  <Vertical className={style.group}>
    <LinkButton
      href={`/ranges/${moveToUrlParam(Move.OPEN)}/${positionToUrlParam(Position.B)}`}
      active={heroMove === Move.OPEN}
      className={style.button}
    >
      {Move.OPEN}
    </LinkButton>
    <LinkButton
      href={`/ranges/${moveToUrlParam(Move.CALL)}/${positionToUrlParam(Position.B)}/vs/${positionToUrlParam(
        Position.UTG
      )}`}
      active={heroMove === Move.CALL}
      className={style.button}
    >
      {Move.CALL}
    </LinkButton>
    <LinkButton
      href={`/ranges/${moveToUrlParam(Move._3BET)}/${positionToUrlParam(Position.B)}/vs/${positionToUrlParam(
        Position.UTG
      )}`}
      active={heroMove === Move._3BET}
      className={style.button}
    >
      {Move._3BET}
    </LinkButton>
    <LinkButton
      href={`/ranges/${moveToUrlParam(Move.CALL3BET)}/${positionToUrlParam(Position.UTG)}/vs/${positionToUrlParam(
        Position.B
      )}`}
      active={heroMove === Move.CALL3BET}
      className={style.button}
    >
      {Move.CALL3BET}
    </LinkButton>
    <LinkButton
      href={`/ranges/${moveToUrlParam(Move._4BET)}/${positionToUrlParam(Position.UTG)}/vs/${positionToUrlParam(
        Position.B
      )}`}
      active={heroMove === Move._4BET}
      className={style.button}
    >
      {Move._4BET}
    </LinkButton>
  </Vertical>
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
              ? `/ranges/${moveToUrlParam(heroMove)}/${positionToUrlParam(position)}`
              : `/ranges/${moveToUrlParam(heroMove)}/${positionToUrlParam(position)}/vs/${
                  vilainPosition ? positionToUrlParam(vilainPosition) : ''
                }`

          return (
            <LinkButton
              className={style.button}
              key={position}
              // disabled={!getHintsTable(heroMove, position, vilainPosition)}
              disabled={!isMoveAllowed(heroMove, position, vilainPosition)}
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
            disabled={heroMove === Move.OPEN || !isMoveAllowed(heroMove, heroPosition, position)}
            href={`/ranges/${moveToUrlParam(heroMove)}/${positionToUrlParam(heroPosition)}/vs/${positionToUrlParam(
              position
            )}`}
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
