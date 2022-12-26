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

const RangeContainer = styled(Vertical)`
  display: flex;
  margin-left: 20px;
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

const Ranges = () => {
  const [heroPosition, setHeroPosition] = useState<Position>(Position.B)
  const [vilainPosition, setVilainPosition] = useState<Position>(Position.B)
  const [heroMove, setHeroMove] = useState<Move>(Move.OPEN)

  const hintsTable = useMemo(
    () => getHintsTable(heroMove, heroPosition, vilainPosition),
    [heroMove, heroPosition, vilainPosition]
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
      <RangeContainer>
        <Title move={heroMove} hero={heroPosition} vilain={vilainPosition} />
        <PercentageOfPlayedHands hintsTable={hintsTable} />
        <RangeTable hintsTable={hintsTable} />
      </RangeContainer>
    </Horizontal>
  )
}

export default Ranges
