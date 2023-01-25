import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { AppTheme, ThemeContext } from 'styled-components'
import Action from 'domain/action'
import ButtonPosition from 'domain/buttonPosition'
import Board from 'domain/board'
import { Dimensions } from 'components/PokerTable/types'
import { drawTable } from 'components/PokerTable/drawTable'
import { drawCard } from 'components/PokerTable/drawCards'
import { drawPlayers } from 'components/PokerTable/drawPlayers'
import { drawPositions } from 'components/PokerTable/drawPositions'
import { drawActions } from 'components/PokerTable/drawActions'

const dimensions = (canvasWidth: number, theme: AppTheme): Dimensions => {
  const breakpointMobile = theme.breakpoints.mobile
  const breakpointTablet = theme.breakpoints.tablet
  const canvasMarge = canvasWidth < 400 ? 10 : canvasWidth < 600 ? 20 : 50
  const width = Math.min(
    canvasWidth - 2 * canvasMarge,
    canvasWidth < breakpointMobile ? breakpointMobile : breakpointTablet
  )
  return {
    width: width - 2 * canvasMarge,
    height: (width - 2 * canvasMarge) / 2,
    marge: canvasMarge,
    centerX: (width - 2 * canvasMarge) / 2 + canvasMarge,
    centerY: (width - 2 * canvasMarge) / 4 + canvasMarge,
    isMobile: canvasWidth < breakpointMobile,
    isTablet: canvasWidth < breakpointTablet,
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
