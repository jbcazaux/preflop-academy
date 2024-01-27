import 'server-only'

import PercentageOfPlayedHands from './PercentageOfPlayedHands'
import style from './PreflopRanges.module.scss'
import RangesMenu from './RangesMenu'

import Horizontal from 'components/layout/Horizontal'
import Vertical from 'components/layout/Vertical'
import RangeTable from 'components/RangeTable/RangeTable'
import { getRange } from 'data/gto-server'
import Move from 'domain/move'
import Position, { positionsNamesMap } from 'domain/position'

interface TitleProps {
  move: Move
  hero: Position
  vilain?: Position
}
const Title = ({ move, hero, vilain }: TitleProps) => {
  if (move === Move.OPEN || !vilain) {
    return <b>{`${move} @ ${positionsNamesMap.get(hero)} :`}</b>
  }
  return <b>{`${move} @ ${positionsNamesMap.get(hero)} vs. ${positionsNamesMap.get(vilain)} :`}</b>
}

const hasVilainOpen = (heroMove: Move) => heroMove !== Move.OPEN
const getVilainMove = (heroMove: Move) => {
  if (heroMove === Move.CALL) return Move.OPEN
  if (heroMove === Move._3BET) return Move.OPEN
  if (heroMove === Move.CALL3BET) return Move._3BET
  if (heroMove === Move._4BET) return Move._3BET

  return Move.FOLD
}

interface Props {
  heroPosition: Position
  heroMove: Move
  vilainPosition?: Position
}

const PreflopRanges = async ({ heroPosition, heroMove, vilainPosition }: Props) => {
  const vilainMove = getVilainMove(heroMove)
  const heroRange = (await getRange(heroMove, heroPosition, vilainPosition)) || {}
  const vilainRange = vilainPosition ? await getRange(vilainMove, vilainPosition, heroPosition) : null
  const _3betRange = heroMove === Move.CALL ? await getRange(Move._3BET, heroPosition, vilainPosition) : null

  return (
    <Horizontal>
      <RangesMenu heroMove={heroMove} heroPosition={heroPosition} vilainPosition={vilainPosition} />
      <Horizontal className={style.wrap}>
        <Vertical className={style['range-container']}>
          <Title move={heroMove} hero={heroPosition} vilain={vilainPosition} />
          <PercentageOfPlayedHands range={heroRange} />
          <RangeTable range={heroRange} />
        </Vertical>
        {heroMove === Move.CALL && _3betRange && (
          <Vertical className={style['range-container']}>
            <Title move={Move._3BET} hero={heroPosition} vilain={vilainPosition} />
            <PercentageOfPlayedHands range={_3betRange} />
            <RangeTable range={_3betRange} />
          </Vertical>
        )}
        {hasVilainOpen(heroMove) && vilainPosition && vilainRange && (
          <Vertical className={style['range-container']}>
            <Title move={vilainMove} hero={vilainPosition} vilain={heroPosition} />
            <PercentageOfPlayedHands range={vilainRange} />
            <RangeTable range={vilainRange} />
          </Vertical>
        )}
      </Horizontal>
    </Horizontal>
  )
}

export default PreflopRanges
