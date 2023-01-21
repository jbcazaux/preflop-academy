import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { AppTheme, ThemeContext } from 'styled-components'
import Action from 'domain/action'
import ButtonPosition from 'domain/buttonPosition'
import { seatNumberByPositionAndButtonPosition } from 'domain/position'
import { Card, cardColor, cardValue } from 'domain/card'
import Board from 'domain/board'

const xyBySeatNumber = (seatNumber: number, centerX: number, centerY: number, radius: number, ratio: number) => {
  const coefByPosition = [6, 5, 3, 2, 1, -1]
  const p = (coefByPosition[seatNumber % 6] * Math.PI) / 4
  const x = centerX + radius * Math.cos(p)
  const y = centerY - ratio * radius * Math.sin(p)

  return [x, y]
}

const diamondPath = new Path2D(
  'M10.831 20.413l-5.375 -6.91c-.608 -.783 -.608 -2.223 0 -3.005l5.375 -6.911a1.457 1.457 0 0 1 2.338 0l5.375 6.91c.608 .783 .608 2.223 0 3.005l-5.375 6.911a1.457 1.457 0 0 1 -2.338 0z'
)
const spadePath = new Path2D(
  'M12 3l4.919 4.5c.61 .587 1.177 1.177 1.703 1.771a5.527 5.527 0 0 1 .264 6.979c-1.18 1.56 -3.338 1.92 -4.886 .75v1l1 3h-6l1 -3v-1c-1.54 1.07 -3.735 .772 -4.886 -.75a5.527 5.527 0 0 1 .264 -6.979a30.883 30.883 0 0 1 1.703 -1.771a1541.72 1541.72 0 0 1 4.919 -4.5z'
)
const clubPath = new Path2D(
  'M12 3a4 4 0 0 1 3.164 6.447a4 4 0 1 1 -1.164 6.198v1.355l1 4h-6l1 -4l.001 -1.355a4 4 0 1 1 -1.164 -6.199a4 4 0 0 1 3.163 -6.446z'
)
const heartPath = new Path2D('M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572')

const drawTable = (ctx: CanvasRenderingContext2D, dimensions: Dimensions, theme: AppTheme) => {
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

export const drawCard = (
  ctx: CanvasRenderingContext2D,
  cardIndex: number,
  shownCards: number,
  dimensions: Dimensions,
  card: Card,
  theme: AppTheme
) => {
  const cardWidth = 30
  const cardHeight = 45
  const cardMargin = 5
  const startX = dimensions.centerX - (shownCards * cardWidth + (shownCards - 1) * cardMargin) / 2
  const x = startX + (cardIndex - 1) * (cardWidth + cardMargin)
  const y = dimensions.centerY - cardHeight / 2

  const value = cardValue(card.id)
  const color = cardColor(card.id)

  ctx.save()
  ctx.beginPath()
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 1
  ctx.fillStyle = 'white'
  ctx.roundRect(x, y, cardWidth, cardHeight, 5)
  ctx.stroke()
  ctx.closePath()
  ctx.fill()
  ctx.font = 'bold 22px Calibri,Helvetica Neue,Arial,sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  if (color === 'SPADE') {
    ctx.fillStyle = theme.colors.deck.spade
  }
  if (color === 'HEART') {
    ctx.fillStyle = theme.colors.deck.heart
  }
  if (color === 'DIAMOND') {
    ctx.fillStyle = theme.colors.deck.diamond
  }
  if (color === 'CLUB') {
    ctx.fillStyle = theme.colors.deck.club
  }
  ctx.fillText(value, x + cardWidth / 2, y + cardHeight / 3 - 3)

  ctx.translate(x + 3, y + cardHeight / 3 + 5)
  if (color === 'DIAMOND') {
    ctx.fill(diamondPath)
  } else if (color === 'SPADE') {
    ctx.fill(spadePath)
  } else if (color === 'HEART') {
    ctx.fill(heartPath)
  } else if (color === 'CLUB') {
    ctx.fill(clubPath)
  }
  ctx.restore()
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
  const breakpointMobile = theme.breakpoints.mobile
  const breakpointTablet = theme.breakpoints.tablet
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
  board?: Board
  width: number
}

const PokerTable = ({
  buttonPosition,
  onButtonChange,
  actions,
  addRaisePosition,
  board = Board.newBoard,
  width,
}: Props) => {
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
    drawTable(context, canvas, theme)

    board?.cards.forEach((card, index) => drawCard(context, index + 1, board?.cards.length, canvas, card, theme))

    /*context.strokeStyle = 'yellow'
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.scale(1, 1);
    context.stroke(new Path2D('M 10 0 H 90 Q 100 0 100 10 V 90 Q 100 100 90 100 H 10 Q 0 100 0 90 V 10 Q 0 0 10 0 Z'))
    context.restore()*/

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
  }, [actions, board, buttonPosition, canvas, context, theme])

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
