import { xyBySeatNumber } from 'components/PokerTable/xyBySeatNumber'
import { AppTheme } from 'styled-components'

const drawPositionName = (
  ctx: CanvasRenderingContext2D,
  xy: number[],
  tableWidth: number,
  text: string,
  theme: AppTheme
) => {
  const [x, y] = xy
  ctx.beginPath()
  ctx.fillStyle = theme.colors.black
  ctx.font = `${tableWidth / 30}px serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, x, y)
}

const drawButton = (ctx: CanvasRenderingContext2D, xy: number[], tableWidth: number, theme: AppTheme) => {
  const [x, y] = xy
  ctx.beginPath()
  ctx.arc(x, y, tableWidth / 35, 0, 2 * Math.PI)
  ctx.fillStyle = theme.colors.table.button
  ctx.fill()

  ctx.font = `bold ${tableWidth / 25}px serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = theme.colors.black
  ctx.fillText('D', x + 1, y + 2)
}

export const drawPositions = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  tableWidth: number,
  tableHeight: number,
  seatNumber: number,
  theme: AppTheme
) => {
  const radius = (Math.max(tableWidth, tableHeight) / 2) * 0.8
  const ratio = tableHeight / tableWidth

  drawButton(ctx, xyBySeatNumber(seatNumber, centerX, centerY, radius, ratio), tableWidth, theme)
  drawPositionName(ctx, xyBySeatNumber(seatNumber + 1, centerX, centerY, radius, ratio), tableWidth, 'SB', theme)
  drawPositionName(ctx, xyBySeatNumber(seatNumber + 2, centerX, centerY, radius, ratio), tableWidth, 'BB', theme)
  drawPositionName(ctx, xyBySeatNumber(seatNumber + 3, centerX, centerY, radius, ratio), tableWidth, 'UTG', theme)
  drawPositionName(ctx, xyBySeatNumber(seatNumber + 4, centerX, centerY, radius, ratio), tableWidth, 'MP', theme)
  drawPositionName(ctx, xyBySeatNumber(seatNumber + 5, centerX, centerY, radius, ratio), tableWidth, 'CO', theme)
}
