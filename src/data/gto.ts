import 'server-only'

import _3bet from './3bet'
import _4bet from './4bet'
import call from './call'
import call3bet from './call3bet'
import open from './open'

import pushfoldHintsTable from 'data/pushfold'
import Hand from 'domain/hand'
import HintTable from 'domain/hintTable'
import Move from 'domain/move'
import Position from 'domain/position'

export const getHintsTable = (move: Move, heroPosition: Position, vilainPosition?: Position): HintTable | null => {
  if (move === Move.OPEN) {
    return open.get(heroPosition) || null
  }
  if (!vilainPosition) return null
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

const openOrFold = (hand: Hand, hero: Position): Move | null => {
  const [x, y] = hand.xyInRangeTable()
  const openHintsTable = getHintsTable(Move.OPEN, hero)
  if (!openHintsTable) {
    return null
  }

  return openHintsTable[x][y] ? Move.OPEN : Move.FOLD
}

const foldOrCallOr3bet = (hand: Hand, hero: Position, raisePositions: ReadonlyArray<Position>): Move | null => {
  const initialRaiser = raisePositions[0]
  const [x, y] = hand.xyInRangeTable()

  const _3BetHintsTable = getHintsTable(Move._3BET, hero, initialRaiser)
  if (_3BetHintsTable?.[x][y]) {
    return Move._3BET
  }

  const callHintsTable = getHintsTable(Move.CALL, hero, initialRaiser)
  if (!callHintsTable) {
    return null
  }

  return callHintsTable[x][y] ? Move.CALL : Move.FOLD
}

const foldOrCall3betOr4bet = (hand: Hand, hero: Position, raisePositions: ReadonlyArray<Position>): Move | null => {
  const lastRaiser = raisePositions[raisePositions.length - 1]
  const [x, y] = hand.xyInRangeTable()

  const _4BetHintsTable = getHintsTable(Move._4BET, hero, lastRaiser)
  if (_4BetHintsTable?.[x][y]) {
    return Move._4BET
  }

  const _3BetsHintsTable = getHintsTable(Move.CALL3BET, hero, lastRaiser)
  if (!_3BetsHintsTable) {
    return null
  }

  return _3BetsHintsTable[x][y] ? Move.CALL3BET : Move.FOLD
}

const gto = (heroPosition: Position, raisePositions: ReadonlyArray<Position>, hand: Hand): Move | null => {
  if (hand.card1 === null || hand.card2 === null) {
    return null
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

  return null
}
export default gto

export const gtoPushFold = (hero: Position, hand: Hand, stack: number): Move | null => {
  if (hand.card1 === null || hand.card2 === null) {
    return null
  }
  const [x, y] = hand.xyInRangeTable()

  const pushFoldHintsTable = pushfoldHintsTable(hero, stack)
  if (!pushFoldHintsTable) {
    return null
  }

  return pushFoldHintsTable[x][y] ? Move.ALL_IN : Move.FOLD
}
