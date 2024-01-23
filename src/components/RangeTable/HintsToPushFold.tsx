'use client'

import { useState } from 'react'

import { migratePushFold } from 'api/migrate-hintstable'
import { Range, RatioRange } from 'domain/combo'
import HintTable, { extractRange } from 'domain/hintTable'
import Position from 'domain/position'

interface Props {
  hintsTable: HintTable | null
  position: Position
  bb: number
}

const HintsToPushFold = ({ hintsTable, position, bb }: Props) => {
  const [result, setResult] = useState<string>('')

  if (!hintsTable) return null

  const range: Range = extractRange(hintsTable)
  const rangeRatio: RatioRange = range.reduce((acc, combo) => ({ ...acc, [combo]: 1 }), {})
  const s = Object.entries(rangeRatio)
    .map(([key, value]) => `${key}:${String(value)}`)
    .join(', ')

  const handleClick = () => {
    void migratePushFold(position, bb, rangeRatio).then(data => setResult(String(data)))
  }

  return (
    <div>
      <input value={`{${s}}`} readOnly size={50} />
      <button onClick={() => handleClick()}>Migrate</button>
      <input value={result} readOnly size={50} />
    </div>
  )
}

export default HintsToPushFold
