import { cards } from './card'

export type HintTableRow = Readonly<
  [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean]
>

type HintTable = Readonly<
  [
    HintTableRow,
    HintTableRow,
    HintTableRow,
    HintTableRow,
    HintTableRow,
    HintTableRow,
    HintTableRow,
    HintTableRow,
    HintTableRow,
    HintTableRow,
    HintTableRow,
    HintTableRow,
    HintTableRow,
  ]
>

export default HintTable

export const defaultHintTable: HintTable = [
  [false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false],
]

export const extractRange = (hintsTable: HintTable): ReadonlyArray<string> =>
  hintsTable.flatMap((row, rowIndex) =>
    row.reduce((acc: ReadonlyArray<string>, combo, cardIndex) => {
      if (!combo) return acc
      if (rowIndex < cardIndex) {
        return acc.concat(`${cards[rowIndex]}${cards[cardIndex]}s`)
      }
      if (rowIndex > cardIndex) {
        return acc.concat(`${cards[cardIndex]}${cards[rowIndex]}o`)
      }
      return acc.concat(`${cards[cardIndex]}${cards[rowIndex]}`)
    }, [])
  )
