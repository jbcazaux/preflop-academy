import { _3bet, _4bet, call, call3bet, open, pushOrFold } from 'api/hintTables'
import Hand from 'domain/hand'
import HintTable from 'domain/hintTable'
import Move from 'domain/move'
import Position from 'domain/position'

export const getHintsTable = (
  move: Move,
  heroPosition: Position,
  vilainPosition?: Position
): Promise<HintTable | null> => {
  if (move === Move.OPEN) {
    return open[heroPosition]()
  }
  if (!vilainPosition) return Promise.resolve(null)
  if (move === Move.CALL) {
    return call[heroPosition](vilainPosition)
  }
  if (move === Move._3BET) {
    return _3bet[heroPosition](vilainPosition)
  }
  if (move === Move.CALL3BET) {
    return call3bet[heroPosition](vilainPosition)
  }
  if (move === Move._4BET) {
    return _4bet[heroPosition](vilainPosition)
  }
  return Promise.resolve(null)
}

const openOrFold = async (hand: Hand, heroPosition: Position): Promise<Move | null> => {
  const [x, y] = hand.xyInRangeTable()
  const openHintsTable = await getHintsTable(Move.OPEN, heroPosition)
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

export const gtoPushFold = async (hero: Position, hand: Hand, stack: number): Promise<Move | null> => {
  if (hand.card1 === null || hand.card2 === null) {
    return Promise.resolve(null)
  }
  const [x, y] = hand.xyInRangeTable()

  const pushFoldHintsTable = await pushOrFold.get(stack, hero)
  if (!pushFoldHintsTable) {
    return Promise.resolve(null)
  }

  return pushFoldHintsTable[x][y] ? Move.ALL_IN : Move.FOLD
}
