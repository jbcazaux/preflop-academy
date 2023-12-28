'use client'

import { useEffect, useState } from 'react'
import Move from 'domain/move'
import Position from 'domain/position'
import Horizontal from 'components/layout/Horizontal'
import TrainingMenu from './trainingMenu/TrainingMenu'
import Training from './Training'

/*const heroPositionFromQueryString = new Map<string, Position | null>([
  ['B', Position.B],
  ['SB', Position.SB],
  ['BB', Position.BB],
  ['UTG', Position.UTG],
  ['MP', Position.MP],
  ['CO', Position.CO],
  ['RANDOM', null],
])*/
interface Props {
  heroPosition: Position
}
const TrainingQueryReader = ({ heroPosition }: Props) => {
  const [moveType, setMoveType] = useState<Move | null>(null)

  //const heroPosition: Position | null = heroPositionFromQueryString.get(position.toUpperCase()) || null

  useEffect(() => setMoveType(null), [heroPosition])
  return (
    <Horizontal>
      <TrainingMenu heroPosition={heroPosition} moveType={moveType} setMoveType={setMoveType} />
      <Training heroPosition={heroPosition} move={moveType} />
    </Horizontal>
  )
}

export default TrainingQueryReader
