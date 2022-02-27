import Hand from 'domain/hand'
import Position from 'domain/position'
import open from './open'
import call from 'data/call'
import _3bet from 'data/3bet'
import call3bet from 'data/call3bet'
import _4bet from 'data/4bet'
import Move from 'domain/move'
import HintTable from 'domain/hintTable'

type Action = 'FOLD' | 'CALL' | 'RAISE' | '3 BET' | 'CALL 3 BET' | '4 BET' | 'N/A'

const xyInHintTable = (hand: Hand): [number, number] => {
  if (hand.card1 === null || hand.card2 === null) {
    throw new Error('N/A')
  }

  const highValue = hand.card1.value === 0 || hand.card1.value >= hand.card2.value ? hand.card1.value : hand.card2.value
  const lowValue = hand.card1.value === 0 || hand.card1.value >= hand.card2.value ? hand.card2.value : hand.card1.value
  const x = highValue === 0 ? 0 : 14 - highValue
  const y = lowValue === 0 ? 0 : 14 - lowValue
  return hand.isSorted() ? [x, y] : [y, x]
}

const getPosition = (player: number, button: number): Position => {
  const positions: ReadonlyArray<Position> = [
    Position.B,
    Position.SB,
    Position.BB,
    Position.UTG,
    Position.MP,
    Position.CO,
  ]
  return positions[(player - button + 6) % 6]
}

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
  const [x, y] = xyInHintTable(hand)
  const openHintsTable = getHintsTable(Move.OPEN, hero, Position.ANY)
  if (!openHintsTable) {
    return 'N/A'
  }

  return openHintsTable[x][y] ? 'RAISE' : 'FOLD'
}

const foldOrCallOr3bet = (hand: Hand, buttonPosition: number, raisePositions: ReadonlyArray<number>): Action => {
  const hero = getPosition(0, buttonPosition)
  const initialRaiser = getPosition(raisePositions[0], buttonPosition)
  const [x, y] = xyInHintTable(hand)

  const _3BetHintsTable = getHintsTable(Move._3BET, hero, initialRaiser)//_3bet.get(hero)?.get(initialRaiser)
  if (_3BetHintsTable?.[x][y]) {
    return '3 BET'
  }

  const callHintsTable = getHintsTable(Move.OPEN, hero, initialRaiser) //call.get(hero)?.get(initialRaiser)
  if (!callHintsTable) {
    return 'N/A'
  }

  return callHintsTable[x][y] ? 'CALL' : 'FOLD'
}

const foldOrCall3betOr4bet = (hand: Hand, buttonPosition: number, raisePositions: ReadonlyArray<number>): Action => {
  const hero = getPosition(0, buttonPosition)
  const lastRaiser = getPosition(raisePositions[raisePositions.length - 1], buttonPosition)
  const [x, y] = xyInHintTable(hand)

  const _4BetHintsTable = getHintsTable(Move._4BET, hero, lastRaiser)//_4bet.get(hero)?.get(lastRaiser)
  if (_4BetHintsTable?.[x][y]) {
    return '4 BET'
  }

  const _3BetsHintsTable = getHintsTable(Move.CALL3BET, hero, lastRaiser) // call3bet.get(hero)?.get(lastRaiser)
  if (!_3BetsHintsTable) {
    return 'N/A'
  }

  return _3BetsHintsTable[x][y] ? 'CALL 3 BET' : 'FOLD'
}


const gto = (buttonPosition: number, raisePositions: ReadonlyArray<number>, hand: Hand): Action => {
  if (hand.card1 === null || hand.card2 === null) {
    return 'N/A'
  }
  const heroPosition: Position = getPosition(0, buttonPosition)

  if (raisePositions.length === 0) {
    return openOrFold(hand, heroPosition)
  }

  if (raisePositions.length === 1) {
    return foldOrCallOr3bet(hand, buttonPosition, raisePositions)
  }

  if (raisePositions.length === 2) {
    if (!raisePositions.includes(buttonPosition)) {
      return 'N/A'
    }
    return foldOrCall3betOr4bet(hand, buttonPosition, raisePositions)
  }

  return 'N/A'
}

export default gto
