import 'server-only'

import { RatioRange } from 'domain/combo'
import Hand from 'domain/hand'
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

export const getRange = async (move: Move, heroPosition: Position, vilainPosition?: Position): Promise<RatioRange> => {
  if (move !== Move.OPEN && !vilainPosition) return {} // FIXME throw error rather than {}

  const rawResponse = await fetch(url(move, heroPosition, move !== Move.OPEN ? vilainPosition : undefined), {
    cache: 'force-cache',
  })
  const range = (await rawResponse.json()) as RatioRange
  logger.debug({ move, heroPosition, vilainPosition, range })
  return range
}

const openOrFold = async (hand: Hand, hero: Position): Promise<Move> => {
  const range = await getRange(Move.OPEN, hero)
  const combo = hand.asCombo()
  return Object.keys(range).includes(combo) ? Move.OPEN : Move.FOLD
}

const foldOrCallOr3bet = async (
  hand: Hand,
  hero: Position,
  raisePositions: ReadonlyArray<Position>
): Promise<Move | null> => {
  const initialRaiser = raisePositions[0]
  const combo = hand.asCombo()

  const _3BetRange = await getRange(Move._3BET, hero, initialRaiser)
  if (_3BetRange[combo]) {
    return Move._3BET
  }

  const callRange = await getRange(Move.CALL, hero, initialRaiser)

  return callRange[combo] ? Move.CALL : Move.FOLD
}

const foldOrCall3betOr4bet = async (
  hand: Hand,
  hero: Position,
  raisePositions: ReadonlyArray<Position>
): Promise<Move> => {
  const lastRaiser = raisePositions[raisePositions.length - 1]
  const combo = hand.asCombo()

  const _4BetRange = await getRange(Move._4BET, hero, lastRaiser)
  if (_4BetRange[combo]) {
    return Move._4BET
  }

  const _3BetsRange = await getRange(Move.CALL3BET, hero, lastRaiser)

  return _3BetsRange[combo] ? Move.CALL3BET : Move.FOLD
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

export const pushfoldRange = async (position: Position, stack: number): Promise<RatioRange | null> => {
  if (position === Position.BB || stack < 2 || stack > 20) return {} // FIXME throw error rather than {}

  const range = await fetch(urlPushFold(position, stack), { cache: 'force-cache' })
  logger.debug({ position, stack, range })
  return (await range.json()) as RatioRange
}

export const gtoPushFold = async (hero: Position, hand: Hand, stack: number): Promise<Move | null> => {
  if (hand.card1 === null || hand.card2 === null) {
    return Promise.resolve(null)
  }

  const pfRange = await pushfoldRange(hero, stack)
  if (!pfRange) {
    return null
  }

  const combo = hand.asCombo()
  return pfRange[combo] ? Move.ALL_IN : Move.FOLD
}
