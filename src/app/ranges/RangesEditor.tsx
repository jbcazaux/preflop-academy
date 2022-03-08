import React, { useContext, useEffect, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Square } from 'components/RangeTable'
import HintTable from 'domain/hintTable'
import PercentageOfPlayedHands from 'app/ranges/PercentageOfPlayedHands'

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
`

interface HandProps {
  active: boolean
  pair: boolean
  suited: boolean
  onClick: () => void
}

const Hand: React.FC<HandProps> = ({ onClick, active, suited, pair, children }) => {
  const { colors } = useContext(ThemeContext)
  const color = active ? colors.range.active : suited || pair ? colors.range.suited : colors.range.offsuit
  return (
    <Square bgColor={color} active={active} onClick={onClick}>
      {children}
      {pair ? '' : suited ? 's' : 'o'}
    </Square>
  )
}

const Vertical = styled.div`
  display: flex;
  flex-direction: column;
`
const cards: ReadonlyArray<string> = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

const defaultTable = new Array(13).fill('').map(() => new Array(13).fill(false))

const RangesEditor: React.VFC = () => {
  const [hints, setHints] = useState<HintTable>(defaultTable)
  const [json, setJson] = useState<string>('')

  const generateTable = () => {
    const lines = cards.reduce((acc, c1, i) => {
      const line = cards
        .map((c2, j) => {
          const hand = i < j ? `${c1}${c2}` : `${c2}${c1}`
          const sop = i === j ? ' ' : i < j ? 's' : 'o'
          return `/*${hand}${sop}*/ ${hints[i][j]}`
        })
        .join(',')
      return acc.concat(`[${line}],`)
    }, '')
    setJson(`[${lines}]`)
  }

  useEffect(generateTable, [hints])

  const handleClick = (i: number, j: number) => {
    setHints(prev =>
      prev.map((row, rowId) => {
        if (i !== rowId) {
          return row
        }
        return row.map((value, cellId) => (j === cellId ? !value : value))
      })
    )
  }
  return (
    <Horizontal>
      <Vertical>
        <PercentageOfPlayedHands hintsTable={hints} />
        {cards.map((c1, i) => (
          <Horizontal key={c1}>
            {cards.map((c2, j) => (
              <Hand
                key={`${c1}${c2}`}
                onClick={() => handleClick(i, j)}
                active={hints[i][j]}
                suited={i < j}
                pair={i === j}
              >
                {i < j ? `${c1}${c2}` : `${c2}${c1}`}
              </Hand>
            ))}
          </Horizontal>
        ))}
      </Vertical>
      <textarea value={json} cols={100} />
    </Horizontal>
  )
}

export default RangesEditor
