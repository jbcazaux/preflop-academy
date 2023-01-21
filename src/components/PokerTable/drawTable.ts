import { Dimensions } from 'components/PokerTable/types'
import { AppTheme } from 'styled-components'

export const drawTable = (ctx: CanvasRenderingContext2D, dimensions: Dimensions, theme: AppTheme) => {
  const x = dimensions.width / 2 + dimensions.marge
  const y = dimensions.height + (dimensions.marge * dimensions.width) / dimensions.height
  const rw = dimensions.width / 2
  const rh = dimensions.height / 2
  ctx.save()
  const gradientBorder = ctx.createLinearGradient(dimensions.marge, y, dimensions.width + dimensions.marge, y)
  gradientBorder.addColorStop(0, 'black')
  gradientBorder.addColorStop(0.3, 'white')
  gradientBorder.addColorStop(0.5, 'black')
  gradientBorder.addColorStop(0.7, 'white')
  gradientBorder.addColorStop(1, 'black')
  ctx.strokeStyle = gradientBorder
  ctx.ellipse(x, y / 2, rw, rh, 0, 0, 2 * Math.PI)
  ctx.lineWidth = 14
  ctx.stroke()
  ctx.restore()

  const gradientFill = ctx.createRadialGradient(x, y - 1.5 * rh, 0, x, y - 1.5 * rh, 1.25 * rw)
  gradientFill.addColorStop(0, theme.colors.secondary)
  gradientFill.addColorStop(1, theme.colors.primary)
  ctx.fillStyle = gradientFill
  ctx.fill()
}
