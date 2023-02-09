import { useMemo, useState } from 'react'
import Position, { positionsNamesMap } from 'domain/position'
import Move from 'domain/move'
import { getHintsTable } from 'data/gto'
import PercentageOfPlayedHands from 'app/ranges/PercentageOfPlayedHands'
import RangeTable from 'components/RangeTable'
import Horizontal from 'components/layout/Horizontal'
import RangesMenu from 'app/ranges/RangesMenu'
import styled from 'styled-components'
import Vertical from 'components/layout/Vertical'

const HorizontalWrap = styled(Horizontal)`
  flex-wrap: wrap;
`

const RangeContainer = styled(Vertical)`
  flex: 0;
  margin: 10px 20px;
`

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

const hasVilainOpen = (hero: Position, vilain: Position, heroMove: Move) => heroMove !== Move.OPEN
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
      <HorizontalWrap>
        <RangeContainer>
          <Title move={heroMove} hero={heroPosition} vilain={vilainPosition} />
          <PercentageOfPlayedHands hintsTable={heroHintsTable} />
          <RangeTable hintsTable={heroHintsTable} />
        </RangeContainer>
        {heroMove === Move.CALL && (
          <RangeContainer>
            <Title move={Move._3BET} hero={heroPosition} vilain={vilainPosition} />
            <PercentageOfPlayedHands hintsTable={getHintsTable(Move._3BET, heroPosition, vilainPosition)} />
            <RangeTable hintsTable={getHintsTable(Move._3BET, heroPosition, vilainPosition)} />
          </RangeContainer>
        )}
        {hasVilainOpen(heroPosition, vilainPosition, heroMove) && (
          <RangeContainer>
            <Title move={vilainMove} hero={vilainPosition} vilain={heroPosition} />
            <PercentageOfPlayedHands hintsTable={vilainHintsTable} />
            <RangeTable hintsTable={vilainHintsTable} />
          </RangeContainer>
        )}
      </HorizontalWrap>
    </Horizontal>
  )
}

export default Ranges
