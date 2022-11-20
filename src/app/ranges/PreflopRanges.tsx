import { useMemo, useState } from 'react'
import Position, { allPositions, positionsNamesMap } from 'domain/position'
import Move from 'domain/move'
import { getHintsTable } from 'data/gto'
import PercentageOfPlayedHands from 'app/ranges/PercentageOfPlayedHands'
import RangeTable from 'components/RangeTable'
import Moves from 'app/ranges/Moves'
import Horizontal from 'components/layout/Horizontal'
import Button from 'components/Button'

const Ranges = () => {
  const [heroPosition, setHeroPosition] = useState<Position>(Position.B)
  const [vilainPosition, setVilainPosition] = useState<Position>(Position.B)
  const [heroMove, setHeroMove] = useState<Move>(Move.OPEN)

  const hintsTable = useMemo(
    () => getHintsTable(heroMove, heroPosition, vilainPosition),
    [heroMove, heroPosition, vilainPosition]
  )

  return (
    <div>
      <Horizontal>
        {heroMove}&nbsp;:&nbsp;
        <PercentageOfPlayedHands hintsTable={hintsTable} />
      </Horizontal>
      <RangeTable hintsTable={hintsTable} />
      <Horizontal>
        <Moves setHeroMove={setHeroMove} heroMove={heroMove} />
      </Horizontal>
      <Horizontal>
        {allPositions.map(position => (
          <Button
            key={position}
            disabled={!getHintsTable(heroMove, position, vilainPosition)}
            onClick={() => setHeroPosition(position)}
            active={heroPosition === position}
          >
            {positionsNamesMap.get(position) || ''}
          </Button>
        ))}
      </Horizontal>
      <Horizontal>
        {allPositions.map(position => (
          <Button
            key={position}
            disabled={heroMove === Move.OPEN || !getHintsTable(heroMove, heroPosition, position)}
            onClick={() => setVilainPosition(position)}
            active={vilainPosition === position}
          >
            {positionsNamesMap.get(position) || ''}
          </Button>
        ))}
      </Horizontal>
    </div>
  )
}

export default Ranges
