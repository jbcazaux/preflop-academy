'use client'

import { useEffect, useState } from 'react'
import Move from 'domain/move'
import Position from 'domain/position'

import Horizontal from 'components/layout/Horizontal'

import TrainingMenu from './trainingMenu/TrainingMenu'
import Training from './Training'

interface Props {
  heroPosition: Position
}
const TrainingQueryReader = ({ heroPosition }: Props) => {
  const [moveType, setMoveType] = useState<Move | null>(null)

  useEffect(() => setMoveType(null), [heroPosition])
  return (
    <Horizontal>
      <TrainingMenu heroPosition={heroPosition} moveType={moveType} setMoveType={setMoveType} />
      <Training heroPosition={heroPosition} move={moveType} />
    </Horizontal>
  )
}

export default TrainingQueryReader
