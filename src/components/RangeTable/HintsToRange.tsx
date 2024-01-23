'use client'

import { useState } from 'react'

import { migrateRange } from 'api/migrate-hintstable'
import { Range, RatioRange } from 'domain/combo'
import HintTable, { extractRange } from 'domain/hintTable'
import Move from 'domain/move'
import Position from 'domain/position'

interface Props {
  hintsTable: HintTable | null
  position: Position
  move: Move
  vs?: Position
}

const HintsToRange = ({ hintsTable, position, move, vs }: Props) => {
  const [result, setResult] = useState<string>('')

  if (!hintsTable) return null

  const range: Range = extractRange(hintsTable)
  const rangeRatio: RatioRange = range.reduce((acc, combo) => ({ ...acc, [combo]: 1 }), {})
  const s = Object.entries(rangeRatio)
    .map(([key, value]) => `${key}:${String(value)}`)
    .join(', ')

  const handleClick = () => {
    void migrateRange(position, move, rangeRatio, vs).then(data => setResult(String(data)))
  }

  return (
    <div>
      <input value={`{${s}}`} readOnly size={100} />
      <button onClick={() => handleClick()}>Migrate</button>
      <input value={result} readOnly size={100} />
    </div>
  )
}

export default HintsToRange
