import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { getHintsTable } from 'data/gto-client'
import HintTable from 'domain/hintTable'
import Move from 'domain/move'
import Position from 'domain/position'

const useFetchHintsTable = (move: Move, heroPosition: Position, vilainPosition?: Position) => {
  const [hintsTable, setHintsTable] = useState<HintTable | null>(null)

  const { isSuccess, data } = useQuery({
    queryKey: [move, heroPosition, vilainPosition],
    queryFn: () => getHintsTable(move, heroPosition, vilainPosition),
  })

  useEffect(() => {
    if (isSuccess) {
      setHintsTable(data)
    }
    setHintsTable(null)
  }, [isSuccess, data])

  return hintsTable
}

export default useFetchHintsTable
