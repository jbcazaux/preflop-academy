type HintTable = ReadonlyArray<ReadonlyArray<boolean>>

export default HintTable

const cards: ReadonlyArray<string> = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

export const getRange = (hintsTable: HintTable): ReadonlyArray<string> =>
  hintsTable.flatMap((row, rowIndex) =>
    row.reduce((acc: ReadonlyArray<string>, card, cardIndex) => {
      if (!card) return acc
      if (rowIndex < cardIndex) {
        return acc.concat(`${cards[rowIndex]}${cards[cardIndex]}s`)
      }
      if (rowIndex > cardIndex) {
        return acc.concat(`${cards[cardIndex]}${cards[rowIndex]}o`)
      }
      return acc.concat(`${cards[cardIndex]}${cards[rowIndex]}`)
    }, [])
  )
