import { AppTheme } from 'styled-components'
import { xyBySeatNumber } from 'components/PokerTable/xyBySeatNumber'

export const drawPlayers = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  tableWidth: number,
  tableHeight: number,
  theme: AppTheme
) => {
  ctx.font = `${tableWidth / 20}px serif`
  ctx.textAlign = 'center'

  const radius = (Math.max(tableWidth, tableHeight) / 2) * 1.2
  const ratio = tableHeight / tableWidth

  drawPlayer(ctx, radius, ratio, centerX, centerY, 0, theme)
  drawPlayer(ctx, radius, ratio, centerX, centerY, 1, theme)
  drawPlayer(ctx, radius, ratio, centerX, centerY, 2, theme)
  drawPlayer(ctx, radius, ratio, centerX, centerY, 3, theme)
  drawPlayer(ctx, radius, ratio, centerX, centerY, 4, theme)
  drawPlayer(ctx, radius, ratio, centerX, centerY, 5, theme)
}

const drawPlayer = (
  ctx: CanvasRenderingContext2D,
  radius: number,
  ratio: number,
  centerX: number,
  centerY: number,
  seatNumber: number,
  theme: AppTheme
) => {
  const [x, y] = xyBySeatNumber(seatNumber, centerX, centerY, radius, ratio)
  const alignByPosition = ['center', 'right', 'right', 'center', 'left', 'left']

  ctx.beginPath()
  ctx.font = `normal ${20}px serif`
  ctx.textAlign = alignByPosition[seatNumber % 6] as CanvasTextAlign
  ctx.textBaseline = 'middle'
  ctx.fillStyle = theme.colors.black
  ctx.fillText(seatNumber === 0 ? 'Hero' : 'Vilain ' + seatNumber, x, y)
}
