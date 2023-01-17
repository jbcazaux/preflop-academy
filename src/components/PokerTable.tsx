import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { AppTheme, ThemeContext } from 'styled-components'
import Action from 'domain/action'
import ButtonPosition from 'domain/buttonPosition'
import { seatNumberByPositionAndButtonPosition } from 'domain/position'

const xyBySeatNumber = (seatNumber: number, centerX: number, centerY: number, radius: number, ratio: number) => {
  const coefByPosition = [6, 5, 3, 2, 1, -1]
  const p = (coefByPosition[seatNumber % 6] * Math.PI) / 4
  const x = centerX + radius * Math.cos(p)
  const y = centerY - ratio * radius * Math.sin(p)

  return [x, y]
}

const drawTable = (ctx: CanvasRenderingContext2D, x: number, y: number, rw: number, rh: number, theme: AppTheme) => {
  ctx.save()
  ctx.scale(1, rh / rw)
  ctx.beginPath()
  ctx.arc(x, y, rw, 0, 2 * Math.PI)
  ctx.restore()
  ctx.lineWidth = 4
  ctx.strokeStyle = theme.colors.table.stroke

  const gradient = ctx.createRadialGradient(x, y - 1.5 * rh, 0, x, y - 1.5 * rh, 1.25 * rw)
  gradient.addColorStop(0, theme.colors.secondary)
  gradient.addColorStop(1, theme.colors.primary)
  ctx.fillStyle = gradient
  ctx.fill()
  ctx.stroke()
}

const drawPlayers = (
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

const drawActions = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  tableWidth: number,
  tableHeight: number,
  actions: ReadonlyArray<Action>,
  buttonPosition: ButtonPosition,
  theme: AppTheme
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

      ctx.fillStyle = theme.colors.table.action
      ctx.font = `bold ${tableWidth / 30}px serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(text, x, y)
    }
  )
}

const drawPositions = (
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

interface Dimensions {
  width: number
  height: number
  marge: number
  centerX: number
  centerY: number
  isMobile: boolean
  isTablet: boolean
}

const dimensions = (widthWindow: number, theme: AppTheme): Dimensions => {
  const breakpointMobile = Number(theme.breakpoints.max.mobile.match(/\d+/)?.[0])
  const breakpointTablet = Number(theme.breakpoints.max.tablet.match(/\d+/)?.[0])
  // const canvasMarge = widthWindow < breakpoint ? 20 : 50
  const canvasMarge = widthWindow < breakpointMobile ? 20 : widthWindow < breakpointTablet ? 40 : 70
  const width = Math.min(
    widthWindow - 2 * canvasMarge,
    widthWindow < breakpointMobile ? breakpointMobile : breakpointTablet
  )
  return {
    width: width - 2 * canvasMarge,
    height: (width - 2 * canvasMarge) / 2,
    marge: canvasMarge,
    centerX: (width - 2 * canvasMarge) / 2 + canvasMarge,
    centerY: (width - 2 * canvasMarge) / 4 + canvasMarge,
    isMobile: widthWindow < breakpointMobile,
    isTablet: widthWindow < breakpointTablet,
  }
}

interface Props {
  buttonPosition: ButtonPosition
  onButtonChange: (p: ButtonPosition) => void
  actions: ReadonlyArray<Action>
  addRaisePosition: (seatNumber: number) => void
  width: number
}

const PokerTable = ({ buttonPosition, onButtonChange, actions, addRaisePosition, width }: Props) => {
  const theme = useContext(ThemeContext)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const canvas = useMemo(() => dimensions(width, theme), [width, theme])

  const onMouseClick = useCallback(
    (event: MouseEvent) => {
      if (!canvasRef.current) return

      const boundingRect = canvasRef.current.getBoundingClientRect()
      const eventX = event.x - boundingRect.left
      const eventY = event.y - boundingRect.top

      if (eventX < canvas.width / 3 + canvas.marge) {
        onButtonChange(eventY < canvas.centerY ? 2 : 1)
      } else if (eventX < (canvas.width * 2) / 3 + canvas.marge) {
        onButtonChange(eventY < canvas.centerY ? 3 : 0)
      } else {
        onButtonChange(eventY < canvas.centerY ? 4 : 5)
      }
    },
    [canvas, onButtonChange]
  )

  const onContextMenu = useCallback(
    (event: MouseEvent) => {
      event.preventDefault()
      if (!canvasRef.current) return

      const boundingRect = canvasRef.current.getBoundingClientRect()
      const eventX = event.x - boundingRect.left
      const eventY = event.y - boundingRect.top

      if (eventX < canvas.width / 3 + canvas.marge) {
        addRaisePosition(eventY < canvas.centerY ? 2 : 1)
      } else if (eventX < (canvas.width * 2) / 3 + canvas.marge) {
        addRaisePosition(eventY < canvas.centerY ? 3 : 0)
      } else {
        addRaisePosition(eventY < canvas.centerY ? 4 : 5)
      }
    },
    [addRaisePosition, canvas]
  )

  useEffect(() => {
    if (!context) {
      const c = canvasRef.current
      if (!c) return
      setContext(c.getContext('2d'))
      return
    }

    context.fillStyle = theme.colors.background
    context.fillRect(0, 0, canvas.width + 2 * canvas.marge, canvas.height + 2 * canvas.marge)
    drawTable(
      context,
      canvas.width / 2 + canvas.marge,
      canvas.height + (canvas.marge * canvas.width) / canvas.height,
      canvas.width / 2,
      canvas.height / 2,
      theme
    )
    drawActions(context, canvas.centerX, canvas.centerY, canvas.width, canvas.height, actions, buttonPosition, theme)
    drawPositions(context, canvas.centerX, canvas.centerY, canvas.width, canvas.height, buttonPosition, theme)
    !canvas.isMobile &&
      !canvas.isTablet &&
      drawPlayers(
        context,
        canvas.width / 2 + canvas.marge,
        canvas.height / 2 + canvas.marge,
        canvas.width,
        canvas.height,
        theme
      )
  }, [
    actions,
    buttonPosition,
    canvas.centerX,
    canvas.centerY,
    canvas.height,
    canvas.isMobile,
    canvas.isTablet,
    canvas.marge,
    canvas.width,
    context,
    theme,
  ])

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return

    c.addEventListener('click', onMouseClick)
    c.addEventListener('contextmenu', onContextMenu)
    return () => {
      c.removeEventListener('click', onMouseClick)
      c.removeEventListener('contextmenu', onContextMenu)
    }
  }, [context, onContextMenu, onMouseClick])

  return (
    <canvas
      ref={canvasRef}
      width={canvas.width + 2 * canvas.marge}
      height={canvas.height + 2 * canvas.marge}
      style={{
        margin: '0 auto',
        width: `${canvas.width + 2 * canvas.marge}px`,
        height: `${canvas.height + 2 * canvas.marge}px`,
      }}
    />
  )
}

export default PokerTable
