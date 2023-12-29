'use client'

import { useMemo, useState } from 'react'
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
  vilain: Position
}
const Title = ({ move, hero, vilain }: TitleProps) => {
  if (move === Move.OPEN) {
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

const Ranges = () => {
  const [heroPosition, setHeroPosition] = useState<Position>(Position.B)
  const [vilainPosition, setVilainPosition] = useState<Position>(Position.B)
  const [heroMove, setHeroMove] = useState<Move>(Move.OPEN)

  const vilainMove = useMemo(() => getVilainMove(heroMove), [heroMove])

  const heroHintsTable = useMemo(
    () => getHintsTable(heroMove, heroPosition, vilainPosition),
    [heroMove, heroPosition, vilainPosition]
  )
  const vilainHintsTable = useMemo(
    () => getHintsTable(vilainMove, vilainPosition, heroPosition),
    [heroPosition, vilainMove, vilainPosition]
  )

  return (
    <Horizontal>
      <RangesMenu
        heroMove={heroMove}
        setHeroMove={setHeroMove}
        heroPosition={heroPosition}
        setHeroPosition={setHeroPosition}
        vilainPosition={vilainPosition}
        setVilainPosition={setVilainPosition}
      />
      <Horizontal className={style.wrap}>
        <Vertical className={style['range-container']}>
          <Title move={heroMove} hero={heroPosition} vilain={vilainPosition} />
          <PercentageOfPlayedHands hintsTable={heroHintsTable} />
          <RangeTable hintsTable={heroHintsTable} />
        </Vertical>
        {heroMove === Move.CALL && (
          <Vertical className={style['range-container']}>
            <Title move={Move._3BET} hero={heroPosition} vilain={vilainPosition} />
            <PercentageOfPlayedHands hintsTable={getHintsTable(Move._3BET, heroPosition, vilainPosition)} />
            <RangeTable hintsTable={getHintsTable(Move._3BET, heroPosition, vilainPosition)} />
          </Vertical>
        )}
        {hasVilainOpen(heroMove) && (
          <Vertical className={style['range-container']}>
            <Title move={vilainMove} hero={vilainPosition} vilain={heroPosition} />
            <PercentageOfPlayedHands hintsTable={vilainHintsTable} />
            <RangeTable hintsTable={vilainHintsTable} />
          </Vertical>
        )}
      </Horizontal>
    </Horizontal>
  )
}

export default Ranges
