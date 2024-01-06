import 'server-only'

import { getHintsTable } from 'data/gto'
import Move from 'domain/move'
import Position, { positionsNamesMap } from 'domain/position'

import Horizontal from 'components/layout/Horizontal'
import Vertical from 'components/layout/Vertical'
import RangeTable from 'components/RangeTable/RangeTable'

import PercentageOfPlayedHands from './PercentageOfPlayedHands'
import RangesMenu from './RangesMenu'

import style from './PreflopRanges.module.scss'

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
  const heroHintTable = await getHintsTable(heroMove, heroPosition, vilainPosition)
  const vilainHintTable = vilainPosition ? await getHintsTable(vilainMove, vilainPosition, heroPosition) : null
  const _3betHintTable = heroMove === Move.CALL ? await getHintsTable(Move._3BET, heroPosition, vilainPosition) : null

  return (
    <Horizontal>
      <RangesMenu heroMove={heroMove} heroPosition={heroPosition} vilainPosition={vilainPosition} />
      <Horizontal className={style.wrap}>
        <Vertical className={style['range-container']}>
          <Title move={heroMove} hero={heroPosition} vilain={vilainPosition} />
          <PercentageOfPlayedHands hintsTable={heroHintTable} />
          <RangeTable hintsTable={heroHintTable} />
        </Vertical>
        {heroMove === Move.CALL && _3betHintTable && (
          <Vertical className={style['range-container']}>
            <Title move={Move._3BET} hero={heroPosition} vilain={vilainPosition} />
            <PercentageOfPlayedHands hintsTable={_3betHintTable} />
            <RangeTable hintsTable={_3betHintTable} />
          </Vertical>
        )}
        {hasVilainOpen(heroMove) && vilainPosition && (
          <Vertical className={style['range-container']}>
            <Title move={vilainMove} hero={vilainPosition} vilain={heroPosition} />
            <PercentageOfPlayedHands hintsTable={vilainHintTable} />
            <RangeTable hintsTable={vilainHintTable} />
          </Vertical>
        )}
      </Horizontal>
    </Horizontal>
  )
}

export default PreflopRanges
