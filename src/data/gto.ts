import 'server-only'

import { RatioRange, convertToHintsTable } from 'domain/combo'
import Hand from 'domain/hand'
import HintTable from 'domain/hintTable'
import Move, { moveToUrlParam } from 'domain/move'
import Position, { positionToUrlParam } from 'domain/position'
import logger from 'utils/logger'

const getBaseUrl = () => {
  if (process.env.VERCEL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
  }
  return `${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
}
const baseURL = getBaseUrl()

const url = (move: Move, position: Position, vilainPosition?: Position): string =>
  `${baseURL}/db/ranges/${moveToUrlParam(move)}/${positionToUrlParam(position)}${vilainPosition ? `/vs/${positionToUrlParam(vilainPosition)}` : ''}`

const urlPushFold = (position: Position, stack: number): string =>
  `${baseURL}/db/push-fold/${positionToUrlParam(position)}/${stack}`

export const getHintsTable = async (
  move: Move,
  heroPosition: Position,
  vilainPosition?: Position
): Promise<HintTable | null> => {
  if (move !== Move.OPEN && !vilainPosition) return null

  const rawResponse = await fetch(url(move, heroPosition, move !== Move.OPEN ? vilainPosition : undefined), {
    cache: 'force-cache',
  })
  const result = (await rawResponse.json()) as RatioRange
  logger.debug({ move, heroPosition, vilainPosition, result })
  return convertToHintsTable(result)
}

const openOrFold = async (hand: Hand, hero: Position): Promise<Move | null> => {
  const [x, y] = hand.xyInRangeTable()
  const openHintsTable = await getHintsTable(Move.OPEN, hero)
  if (!openHintsTable) {
    return null
  }

  return openHintsTable[x][y] ? Move.OPEN : Move.FOLD
}

const foldOrCallOr3bet = async (
  hand: Hand,
  hero: Position,
  raisePositions: ReadonlyArray<Position>
): Promise<Move | null> => {
  const initialRaiser = raisePositions[0]
  const [x, y] = hand.xyInRangeTable()

  const _3BetHintsTable = await getHintsTable(Move._3BET, hero, initialRaiser)
  if (_3BetHintsTable?.[x][y]) {
    return Move._3BET
  }

  const callHintsTable = await getHintsTable(Move.CALL, hero, initialRaiser)
  if (!callHintsTable) {
    return null
  }

  return callHintsTable[x][y] ? Move.CALL : Move.FOLD
}

const foldOrCall3betOr4bet = async (
  hand: Hand,
  hero: Position,
  raisePositions: ReadonlyArray<Position>
): Promise<Move | null> => {
  const lastRaiser = raisePositions[raisePositions.length - 1]
  const [x, y] = hand.xyInRangeTable()

  const _4BetHintsTable = await getHintsTable(Move._4BET, hero, lastRaiser)
  if (_4BetHintsTable?.[x][y]) {
    return Move._4BET
  }

  const _3BetsHintsTable = await getHintsTable(Move.CALL3BET, hero, lastRaiser)
  if (!_3BetsHintsTable) {
    return null
  }

  return _3BetsHintsTable[x][y] ? Move.CALL3BET : Move.FOLD
}

const gto = (heroPosition: Position, raisePositions: ReadonlyArray<Position>, hand: Hand): Promise<Move | null> => {
  if (hand.card1 === null || hand.card2 === null) {
    return Promise.resolve(null)
  }

  if (raisePositions.length === 0) {
    return openOrFold(hand, heroPosition)
  }

  if (raisePositions.length === 1) {
    return foldOrCallOr3bet(hand, heroPosition, raisePositions)
  }

  if (raisePositions.length === 2) {
    return foldOrCall3betOr4bet(hand, heroPosition, raisePositions)
  }

  return Promise.resolve(null)
}
export default gto

export const pushfoldHintsTable = async (position: Position, stack: number): Promise<HintTable | null> => {
  if (position === Position.BB || stack < 5 || stack > 20) return null

  const rawResponse = await fetch(urlPushFold(position, stack), { cache: 'force-cache' })
  const result = (await rawResponse.json()) as RatioRange

  return convertToHintsTable(result)
}

export const gtoPushFold = async (hero: Position, hand: Hand, stack: number): Promise<Move | null> => {
  if (hand.card1 === null || hand.card2 === null) {
    return Promise.resolve(null)
  }

  const pushFoldHintsTable = await pushfoldHintsTable(hero, stack)
  if (!pushFoldHintsTable) {
    return null
  }
  const [x, y] = hand.xyInRangeTable()
  return pushFoldHintsTable[x][y] ? Move.ALL_IN : Move.FOLD
}
