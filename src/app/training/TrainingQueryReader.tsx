import { useEffect, useState } from 'react'
import Training from 'app/training/Training'
import { useParams } from 'react-router'
import Move from 'domain/move'
import Position from 'domain/position'
import Horizontal from 'components/layout/Horizontal'
import TrainingMenu from 'app/training/TrainingMenu'

const heroPositionFromQueryString = new Map<string, Position>([
  ['B', Position.B],
  ['SB', Position.SB],
  ['BB', Position.BB],
  ['UTG', Position.UTG],
  ['MP', Position.MP],
  ['CO', Position.CO],
])

const TrainingQueryReader = () => {
  const [moveType, setMoveType] = useState<Move | null>(null)
  const { position = 'B' } = useParams()
  const heroPosition: Position = heroPositionFromQueryString.get(position.toUpperCase()) ?? Position.BB

  useEffect(() => setMoveType(null), [heroPosition])
  return (
    <Horizontal>
      <TrainingMenu heroPosition={heroPosition} moveType={moveType} setMoveType={setMoveType} />
      <Training heroPosition={heroPosition} move={moveType} />
    </Horizontal>
  )
}

export default TrainingQueryReader
