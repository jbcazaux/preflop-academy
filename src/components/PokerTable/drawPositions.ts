import { xyBySeatNumber } from 'components/PokerTable/xyBySeatNumber'
import style from 'components/Theme/style'

const drawPositionName = (ctx: CanvasRenderingContext2D, xy: number[], tableWidth: number, text: string) => {
  const [x, y] = xy
  ctx.beginPath()
  ctx.fillStyle = style.colors.black
  ctx.font = `${tableWidth / 30}px serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, x, y)
}

const drawButton = (ctx: CanvasRenderingContext2D, xy: number[], tableWidth: number) => {
  const [x, y] = xy
  ctx.beginPath()
  ctx.arc(x, y, tableWidth / 35, 0, 2 * Math.PI)
  ctx.fillStyle = style.colors.table.button
  ctx.fill()

  ctx.font = `bold ${tableWidth / 25}px serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = style.colors.black

  const xoffset = tableWidth > 400 ? 1.5 : 0.5
  const yoffset = tableWidth > 400 ? 2 : 1
  ctx.fillText('D', x + xoffset, y + yoffset)
}

export const drawPositions = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  tableWidth: number,
  tableHeight: number,
  seatNumber: number
) => {
  const radius = (Math.max(tableWidth, tableHeight) / 2) * 0.8
  const ratio = tableHeight / tableWidth

  drawButton(ctx, xyBySeatNumber(seatNumber, centerX, centerY, radius, ratio), tableWidth)
  drawPositionName(ctx, xyBySeatNumber(seatNumber + 1, centerX, centerY, radius, ratio), tableWidth, 'SB')
  drawPositionName(ctx, xyBySeatNumber(seatNumber + 2, centerX, centerY, radius, ratio), tableWidth, 'BB')
  drawPositionName(ctx, xyBySeatNumber(seatNumber + 3, centerX, centerY, radius, ratio), tableWidth, 'UTG')
  drawPositionName(ctx, xyBySeatNumber(seatNumber + 4, centerX, centerY, radius, ratio), tableWidth, 'MP')
  drawPositionName(ctx, xyBySeatNumber(seatNumber + 5, centerX, centerY, radius, ratio), tableWidth, 'CO')
}
