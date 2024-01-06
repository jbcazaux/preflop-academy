import Action from 'domain/action'
import ButtonPosition from 'domain/buttonPosition'
import { seatNumberByPositionAndButtonPosition } from 'domain/position'

import { xyBySeatNumber } from 'components/PokerTable/xyBySeatNumber'
import style from 'components/Theme/style'

export const drawActions = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  tableWidth: number,
  tableHeight: number,
  actions: ReadonlyArray<Action>,
  buttonPosition: ButtonPosition
) => {
  const radius = (Math.max(tableWidth, tableHeight) / 2) * 0.6
  const ratio = tableHeight / tableWidth

  Object.values(actions.reduce((acc: { [key: string]: Action }, cur) => ({ ...acc, [cur.position]: cur }), {})).forEach(
    action => {
      const text = action.move.toLocaleLowerCase()
      const [x, y] = xyBySeatNumber(
        seatNumberByPositionAndButtonPosition(action.position, buttonPosition),
        centerX,
        centerY,
        radius,
        ratio
      )
      ctx.beginPath()
      ctx.fillStyle = style.colors.table.action
      ctx.font = `bold ${tableWidth / 30}px serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(text, x, y)
    }
  )
}
