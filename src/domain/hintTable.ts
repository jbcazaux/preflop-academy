import { cards } from './card'
import { ComboType, Range, isComboType } from './combo'

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

export const extractRange = (hintsTable: HintTable): Range =>
  hintsTable.flatMap((row, rowIndex) =>
    row.reduce((acc: ReadonlyArray<ComboType>, combo, cardIndex) => {
      if (!combo) return acc

      if (rowIndex < cardIndex) {
        const c = `${cards[rowIndex]}${cards[cardIndex]}s`
        return isComboType(c) ? acc.concat(c) : acc
      }
      if (rowIndex > cardIndex) {
        const c = `${cards[cardIndex]}${cards[rowIndex]}o`
        return isComboType(c) ? acc.concat(c) : acc
      }
      const c = `${cards[cardIndex]}${cards[rowIndex]}`
      return isComboType(c) ? acc.concat(c) : acc
    }, [])
  )
