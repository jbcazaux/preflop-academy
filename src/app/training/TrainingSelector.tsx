import React from 'react'
import Training from 'app/training/Training'
import Position from 'domain/position'
import { Route, Routes } from 'react-router-dom'
import { useParams } from 'react-router'

const positionMap = new Map<string, Position>([
  ['B', Position.B],
  ['SB', Position.SB],
  ['BB', Position.BB],
  ['UTG', Position.UTG],
  ['MP', Position.MP],
  ['CO', Position.CO],
])
const TrainingMapper: React.VFC = () => {
  const { position: positionParam = 'B' } = useParams()
  const position = positionMap.get(positionParam.toUpperCase()) ?? Position.B
  return <Training buttonPosition={position} />
}

const TrainingSelector: React.VFC = () => {
  return (
    <Routes>
      <Route path=":position" element={<TrainingMapper />} />
    </Routes>
  )
}

export default TrainingSelector
