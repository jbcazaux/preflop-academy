'use client'

import 'client-only'

import { Dimensions } from 'components/PokerTable/types'
import style from 'components/Theme/style'
import { Card, cardColor, cardValue } from 'domain/card'

const onBrowser = typeof window !== 'undefined'

const colorsPath = {
  diamond: onBrowser
    ? new Path2D(
        'M10.831 20.413l-5.375 -6.91c-.608 -.783 -.608 -2.223 0 -3.005l5.375 -6.911a1.457 1.457 0 0 1 2.338 0l5.375 6.91c.608 .783 .608 2.223 0 3.005l-5.375 6.911a1.457 1.457 0 0 1 -2.338 0z'
      )
    : null,
  spade: onBrowser
    ? new Path2D(
        'M12 3l4.919 4.5c.61 .587 1.177 1.177 1.703 1.771a5.527 5.527 0 0 1 .264 6.979c-1.18 1.56 -3.338 1.92 -4.886 .75v1l1 3h-6l1 -3v-1c-1.54 1.07 -3.735 .772 -4.886 -.75a5.527 5.527 0 0 1 .264 -6.979a30.883 30.883 0 0 1 1.703 -1.771a1541.72 1541.72 0 0 1 4.919 -4.5z'
      )
    : null,
  club: onBrowser
    ? new Path2D(
        'M12 3a4 4 0 0 1 3.164 6.447a4 4 0 1 1 -1.164 6.198v1.355l1 4h-6l1 -4l.001 -1.355a4 4 0 1 1 -1.164 -6.199a4 4 0 0 1 3.163 -6.446z'
      )
    : null,
  heart: onBrowser
    ? new Path2D('M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572')
    : null,
}

export const drawCard = (
  ctx: CanvasRenderingContext2D,
  cardIndex: number,
  shownCards: number,
  dimensions: Dimensions,
  card: Card
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
  ctx.strokeStyle = style.colors.black
  ctx.lineWidth = 1
  ctx.fillStyle = style.colors.white
  ctx.roundRect(x, y, cardWidth, cardHeight, 5)
  ctx.stroke()
  ctx.closePath()
  ctx.fill()
  ctx.font = 'bold 22px Calibri,Helvetica Neue,Arial,sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  if (color === 'SPADE') {
    ctx.fillStyle = style.colors.deck.spade
  }
  if (color === 'HEART') {
    ctx.fillStyle = style.colors.deck.heart
  }
  if (color === 'DIAMOND') {
    ctx.fillStyle = style.colors.deck.diamond
  }
  if (color === 'CLUB') {
    ctx.fillStyle = style.colors.deck.club
  }
  ctx.fillText(value, x + cardWidth / 2, y + cardHeight / 3 - 3)

  ctx.translate(x + 3, y + cardHeight / 3 + 5)

  const { diamond, spade, heart, club } = colorsPath
  if (color === 'DIAMOND') {
    diamond && ctx.fill(diamond)
  } else if (color === 'SPADE') {
    spade && ctx.fill(spade)
  } else if (color === 'HEART') {
    heart && ctx.fill(heart)
  } else if (color === 'CLUB') {
    club && ctx.fill(club)
  }
  ctx.restore()
}
