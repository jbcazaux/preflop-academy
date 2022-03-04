import Hand from 'domain/hand'
import Position from 'domain/position'
import open from './open'
import call from './call'
import _3bet from './3bet'
import call3bet from './call3bet'
import _4bet from './4bet'
import Move from 'domain/move'
import HintTable from 'domain/hintTable'
import pushfoldHintsTable from 'data/pushfold'

type Action = 'FOLD' | 'CALL' | 'RAISE' | '3 BET' | 'CALL 3 BET' | '4 BET'| 'ALL-IN' | 'N/A'

export const getHintsTable = (move: Move, heroPosition: Position, vilainPosition: Position): HintTable | null => {
  if (move === Move.OPEN) {
    return open.get(heroPosition) || null
  }
  if (move === Move.CALL) {
    return call.get(heroPosition)?.get(vilainPosition) || null
  }
  if (move === Move._3BET) {
    return _3bet.get(heroPosition)?.get(vilainPosition) || null
  }
  if (move === Move.CALL3BET) {
    return call3bet.get(heroPosition)?.get(vilainPosition) || null
  }
  if (move === Move._4BET) {
    return _4bet.get(heroPosition)?.get(vilainPosition) || null
  }

  return null
}

const openOrFold = (hand: Hand, hero: Position): Action => {
  const [x, y] = hand.xyInRangeTable()
  const openHintsTable = getHintsTable(Move.OPEN, hero, Position.ANY)
  if (!openHintsTable) {
    return 'N/A'
  }

  return openHintsTable[x][y] ? 'RAISE' : 'FOLD'
}

const foldOrCallOr3bet = (hand: Hand, hero: Position, raisePositions: ReadonlyArray<Position>): Action => {
  const initialRaiser = raisePositions[0]
  const [x, y] = hand.xyInRangeTable()

  const _3BetHintsTable = getHintsTable(Move._3BET, hero, initialRaiser)
  if (_3BetHintsTable?.[x][y]) {
    return '3 BET'
  }

  const callHintsTable = getHintsTable(Move.CALL, hero, initialRaiser)
  if (!callHintsTable) {
    return 'N/A'
  }

  return callHintsTable[x][y] ? 'CALL' : 'FOLD'
}

const foldOrCall3betOr4bet = (hand: Hand, hero: Position, raisePositions: ReadonlyArray<Position>): Action => {
  const lastRaiser = raisePositions[raisePositions.length - 1]
  const [x, y] = hand.xyInRangeTable()

  const _4BetHintsTable = getHintsTable(Move._4BET, hero, lastRaiser)
  if (_4BetHintsTable?.[x][y]) {
    return '4 BET'
  }

  const _3BetsHintsTable = getHintsTable(Move.CALL3BET, hero, lastRaiser)
  if (!_3BetsHintsTable) {
    return 'N/A'
  }

  return _3BetsHintsTable[x][y] ? 'CALL 3 BET' : 'FOLD'
}

const gto = (heroPosition: Position, raisePositions: ReadonlyArray<Position>, hand: Hand): Action => {
  if (hand.card1 === null || hand.card2 === null) {
    return 'N/A'
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

  return 'N/A'
}

export const gtoPushFold = (hero: Position, hand: Hand, stack:number): Action => {
  if (hand.card1 === null || hand.card2 === null) {
    return 'N/A'
  }
  const [x, y] = hand.xyInRangeTable()

  const pushFoldHintsTable = pushfoldHintsTable(hero, stack)
  if (!pushFoldHintsTable) {
    return 'N/A'
  }

  return pushFoldHintsTable[x][y] ? 'ALL-IN' : 'FOLD'
}

export default gto
