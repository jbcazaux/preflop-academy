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
  ctx.fillStyle = theme.colors.table.board
  ctx.fill()
  ctx.stroke()
}

const drawPlayers = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  tableWidth: number,
  tableHeight: number
) => {
  ctx.fillStyle = '#000000'
  ctx.font = `${tableWidth / 20}px serif`
  ctx.textAlign = 'center'

  const radius = (Math.max(tableWidth, tableHeight) / 2) * 1.2
  const ratio = tableHeight / tableWidth

  drawPlayer(ctx, radius, ratio, centerX, centerY, 0)
  drawPlayer(ctx, radius, ratio, centerX, centerY, 1)
  drawPlayer(ctx, radius, ratio, centerX, centerY, 2)
  drawPlayer(ctx, radius, ratio, centerX, centerY, 3)
  drawPlayer(ctx, radius, ratio, centerX, centerY, 4)
  drawPlayer(ctx, radius, ratio, centerX, centerY, 5)
}

const drawPlayer = (
  ctx: CanvasRenderingContext2D,
  radius: number,
  ratio: number,
  centerX: number,
  centerY: number,
  seatNumber: number
) => {
  const [x, y] = xyBySeatNumber(seatNumber, centerX, centerY, radius, ratio)
  const alignByPosition = ['center', 'right', 'right', 'center', 'left', 'left']

  ctx.beginPath()
  ctx.font = `normal ${20}px serif`
  ctx.textAlign = alignByPosition[seatNumber % 6] as CanvasTextAlign
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#000000'
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
  clear = false,
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

      if (clear) {
        ctx.fillStyle = theme.colors.table.board
        const { width: size } = ctx.measureText(text)
        const height = parseInt(ctx.font.replaceAll(/[a-zA-Z]/g, ''), 10)
        ctx.fillRect(x - size / 2, y - height / 2, size, height)
      } else {
        ctx.fillText(text, x, y)
      }
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
  clear = false,
  theme: AppTheme
) => {
  const radius = (Math.max(tableWidth, tableHeight) / 2) * 0.8
  const ratio = tableHeight / tableWidth

  drawButton(ctx, xyBySeatNumber(seatNumber, centerX, centerY, radius, ratio), tableWidth, clear, theme)
  drawPositionName(ctx, xyBySeatNumber(seatNumber + 1, centerX, centerY, radius, ratio), tableWidth, 'SB', clear, theme)
  drawPositionName(ctx, xyBySeatNumber(seatNumber + 2, centerX, centerY, radius, ratio), tableWidth, 'BB', clear, theme)
  drawPositionName(
    ctx,
    xyBySeatNumber(seatNumber + 3, centerX, centerY, radius, ratio),
    tableWidth,
    'UTG',
    clear,
    theme
  )
  drawPositionName(ctx, xyBySeatNumber(seatNumber + 4, centerX, centerY, radius, ratio), tableWidth, 'MP', clear, theme)
  drawPositionName(ctx, xyBySeatNumber(seatNumber + 5, centerX, centerY, radius, ratio), tableWidth, 'CO', clear, theme)
}

const drawPositionName = (
  ctx: CanvasRenderingContext2D,
  xy: number[],
  tableWidth: number,
  text: string,
  clear = false,
  theme: AppTheme
) => {
  const [x, y] = xy
  ctx.beginPath()

  ctx.fillStyle = '#000000'
  ctx.font = `${tableWidth / 30}px serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, x, y)

  if (clear) {
    ctx.fillStyle = theme.colors.table.board
    const { width: size } = ctx.measureText(text)
    const height = parseInt(ctx.font, 10)
    ctx.fillRect(x - size / 2, y - height / 2, size, height)
  }
}

const drawButton = (
  ctx: CanvasRenderingContext2D,
  xy: number[],
  tableWidth: number,
  clear = false,
  theme: AppTheme
) => {
  const [x, y] = xy
  ctx.beginPath()
  ctx.arc(x, y, tableWidth / 35 + (clear ? 1 : 0), 0, 2 * Math.PI)
  ctx.fillStyle = theme.colors.table.button
  if (clear) {
    ctx.fillStyle = theme.colors.table.board
  }
  ctx.fill()

  if (!clear) {
    ctx.font = `bold ${tableWidth / 25}px serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#000000'
    ctx.fillText('D', x + 1, y + 2)
  }
}

interface Dimensions {
  width: number
  height: number
  marge: number
  centerX: number
  centerY: number
}

const canvasMarge = 50
const dimensions = (width: number): Dimensions => ({
  width: width - 2 * canvasMarge,
  height: (width - 2 * canvasMarge) / 2,
  marge: canvasMarge,
  centerX: (width - 2 * canvasMarge) / 2 + canvasMarge,
  centerY: (width - 2 * canvasMarge) / 4 + canvasMarge,
})

interface Props {
  buttonPosition: ButtonPosition
  onButtonChange: (p: ButtonPosition) => void
  actions: ReadonlyArray<Action>
  addRaisePosition: (seatNumber: number) => void
  width: number
}

const PokerTable = ({ buttonPosition, onButtonChange, actions, addRaisePosition, width }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const canvas = useMemo(() => dimensions(width), [width])
  const theme = useContext(ThemeContext)

  const onMouseClick = useCallback(
    (event: MouseEvent) => {
      if (event.x < canvas.width / 3 + canvasMarge) {
        onButtonChange(event.y < canvas.centerY ? 2 : 1)
      } else if (event.x < (canvas.width * 2) / 3 + canvasMarge) {
        onButtonChange(event.y < canvas.centerY ? 3 : 0)
      } else {
        onButtonChange(event.y < canvas.centerY ? 4 : 5)
      }
    },
    [canvas, onButtonChange]
  )

  const onContextMenu = useCallback(
    (event: MouseEvent) => {
      event.preventDefault()
      if (event.x < canvas.width / 3 + canvasMarge) {
        addRaisePosition(event.y < canvas.centerY ? 2 : 1)
      } else if (event.x < (canvas.width * 2) / 3 + canvasMarge) {
        addRaisePosition(event.y < canvas.centerY ? 3 : 0)
      } else {
        addRaisePosition(event.y < canvas.centerY ? 4 : 5)
      }
    },
    [addRaisePosition, canvas]
  )

  useEffect(() => {
    if (context) {
      context.fillStyle = 'white'
      context.fillRect(0, 0, canvas.width + 2 * canvas.marge, canvas.height + 2 * canvas.marge)
      drawTable(
        context,
        canvas.width / 2 + canvasMarge,
        canvas.height + (canvasMarge * canvas.width) / canvas.height,
        canvas.width / 2,
        canvas.height / 2,
        theme
      )
      drawPlayers(context, canvas.width / 2 + canvasMarge, canvas.height / 2 + canvasMarge, canvas.width, canvas.height)
    } else {
      const c = canvasRef.current
      if (!c) return
      setContext(c.getContext('2d'))
    }
  }, [canvas, context, theme])

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

  useEffect(() => {
    if (!context) {
      return
    }
    drawPositions(context, canvas.centerX, canvas.centerY, canvas.width, canvas.height, buttonPosition, false, theme)
    return () => {
      drawPositions(context, canvas.centerX, canvas.centerY, canvas.width, canvas.height, buttonPosition, true, theme)
    }
  }, [context, buttonPosition, canvas, theme])

  useEffect(() => {
    if (!context) {
      return
    }
    drawActions(
      context,
      canvas.centerX,
      canvas.centerY,
      canvas.width,
      canvas.height,
      actions,
      buttonPosition,
      false,
      theme
    )
    return () => {
      drawActions(
        context,
        canvas.centerX,
        canvas.centerY,
        canvas.width,
        canvas.height,
        actions,
        buttonPosition,
        true,
        theme
      )
    }
  }, [canvas, context, actions, theme, buttonPosition])

  return (
    <canvas
      ref={canvasRef}
      width={canvas.width + 2 * canvas.marge}
      height={canvas.height + 2 * canvas.marge}
      style={{ width: `${canvas.width + 2 * canvas.marge}px`, height: `${canvas.height + 2 * canvas.marge}px` }}
    />
  )
}

export default PokerTable
