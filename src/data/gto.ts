import Hand from 'domain/hand'
import button from './raise/button'
import cutoff from './raise/cutoff'
import mp from './raise/mp'
import utg from './raise/utg'
import b3betsCo from '../data/3bet/b3betsCo'
import b3betsMp from '../data/3bet/b3betsMp'
import b3betsUtg from '../data/3bet/b3betsUtg'
import sb3betsCo from '../data/3bet/sb3betsCo'
import sb3betsUtg from '../data/3bet/sb3betsUtg'
import sb3betsMp from '../data/3bet/sb3betsMp'
import sb3betsB from '../data/3bet/sb3betsB'
import bb3betsB from '../data/3bet/bb3betsB'
import bb3betsSb from '../data/3bet/bb3betsSb'
import bb3betsUtg from '../data/3bet/bb3betsUtg'
import bb3betsMp from '../data/3bet/bb3betsMp'
import bb3betsCo from '../data/3bet/bb3betsCo'
import mp3betsUtg from '../data/3bet/mp3betsUtg'
import co3betsUtg from '../data/3bet/co3betsUtg'
import co3betsMp from '../data/3bet/co3betsMp'
import bCallsCo from '../data/call/bCallsCo'
import bCallsMp from '../data/call/bCallsMp'
import bCallsUtg from '../data/call/bCallsUtg'
import sbCallsB from '../data/call/sbCallsB'
import sbCallsUtg from '../data/call/sbCallsUtg'
import sbCallsMp from '../data/call/sbCallsMp'
import sbCallsCo from '../data/call/sbCallsCo'
import bbCallsB from '../data/call/bbCallsB'
import bbCallsSb from '../data/call/bbCallsSb'
import bbCallsUtg from '../data/call/bbCallsUtg'
import bbCallsMp from '../data/call/bbCallsMp'
import bbCallsCo from '../data/call/bbCallsCo'
import mpCallsUtg from '../data/call/mpCallsUtg'
import coCallsUtg from '../data/call/coCallsUtg'
import coCallsMp from '../data/call/coCallsMp'
import b4betsSb from '../data/4bet/b4betsSb'
import b4betsBb from '../data/4bet/b4betsBb'
import mp4betsB from '../data/4bet/mp4betsB'
import mp4betsSb from '../data/4bet/mp4betsSb'
import mp4betsBb from '../data/4bet/mp4betsBb'
import mp4betsCo from '../data/4bet/mp4betsCo'
import utg4betsB from '../data/4bet/utg4betsB'
import utg4betsSb from '../data/4bet/utg4betsSb'
import utg4betsBb from '../data/4bet/utg4betsBb'
import utg4betsMp from '../data/4bet/utg4betsMp'
import utg4betsCo from '../data/4bet/utg4betsCo'
import co4betsB from '../data/4bet/co4BetsB'
import co4betsSb from '../data/4bet/co4BetsSb'
import co4betsBb from '../data/4bet/co4BetsBb'
import bCalls3betSb from '../data/call3bet/bCalls3betSb'
import bCalls3betBb from '../data/call3bet/bCalls3betBb'
import sbCalls3betBb from '../data/call3bet/sbCalls3betBb'
import utgCalls3betB from '../data/call3bet/utgCalls3betB'
import utgCalls3betSb from '../data/call3bet/utgCalls3betSb'
import utgCalls3betBb from '../data/call3bet/utgCalls3betBb'
import utgCalls3betMp from '../data/call3bet/utgCalls3betMp'
import utgCalls3betCo from '../data/call3bet/utgCalls3betCo'
import mpCalls3betB from '../data/call3bet/mpCalls3betB'
import mpCalls3betSb from '../data/call3bet/mpCalls3betSb'
import mpCalls3betBb from '../data/call3bet/mpCalls3betBb'
import mpCalls3betCo from '../data/call3bet/mpCalls3betCo'
import coCalls3betB from '../data/call3bet/coCalls3betB'
import coCalls3betSb from '../data/call3bet/coCalls3betSb'
import coCalls3betBb from '../data/call3bet/coCalls3betBb'
import sb from '../data/raise/sb'

type Action = 'FOLD' | 'CALL' | 'RAISE' | '3 BET' | 'CALL 3 BET' | '4 BET' | 'N/A'

const xyInTable = (hand: Hand): [number, number] => {
  if (hand.card1 === null || hand.card2 === null) {
    throw new Error('N/A')
  }

  const highValue = hand.card1.value === 0 || hand.card1.value >= hand.card2.value ? hand.card1.value : hand.card2.value
  const lowValue = hand.card1.value === 0 || hand.card1.value >= hand.card2.value ? hand.card2.value : hand.card1.value
  const x = highValue === 0 ? 0 : 14 - highValue
  const y = lowValue === 0 ? 0 : 14 - lowValue
  return hand.isSorted() ? [x, y] : [y, x]
}

const raiseOrFold = (hand: Hand, buttonPosition: number): Action => {
  const raiseOrFoldAtPosition: { [key: number]: ReadonlyArray<ReadonlyArray<boolean>> } = {
    0: button,
    1: cutoff,
    2: mp,
    3: utg,
    5: sb,
  }

  if (buttonPosition === 4) {
    return 'N/A'
  }

  const [x, y] = xyInTable(hand)
  return raiseOrFoldAtPosition[buttonPosition][x][y] ? 'RAISE' : 'FOLD'
}

const foldOrCallOr3bet = (hand: Hand, buttonPosition: number, raisePositions: ReadonlyArray<number>): Action => {
  const rp: number = raisePositions[0]

  const _3BetOptions: { [key: number]: { [key: number]: ReadonlyArray<ReadonlyArray<boolean>> } } = {
    0: { 3: b3betsUtg, 4: b3betsMp, 5: b3betsCo },
    1: { 4: co3betsUtg, 5: co3betsMp },
    2: { 5: mp3betsUtg },
    3: {},
    4: {
      1: bb3betsUtg,
      2: bb3betsMp,
      3: bb3betsCo,
      4: bb3betsB,
      5: bb3betsSb,
    },
    5: {
      2: sb3betsUtg,
      3: sb3betsMp,
      4: sb3betsCo,
      5: sb3betsB,
    },
  }

  const [x, y] = xyInTable(hand)

  const _3Bet = _3BetOptions[buttonPosition][rp]
  if (_3Bet?.[x][y]) {
    return '3 BET'
  }

  const callRaiseOptions: { [key: number]: { [key: number]: ReadonlyArray<ReadonlyArray<boolean>> } } = {
    0: {
      3: bCallsUtg,
      4: bCallsMp,
      5: bCallsCo,
    },
    1: { 4: coCallsUtg, 5: coCallsMp },
    2: { 5: mpCallsUtg },
    3: {},
    4: {
      1: bbCallsUtg,
      2: bbCallsMp,
      3: bbCallsCo,
      4: bbCallsB,
      5: bbCallsSb,
    },
    5: {
      2: sbCallsUtg,
      3: sbCallsMp,
      4: sbCallsCo,
      5: sbCallsB,
    },
  }
  const callRaise = callRaiseOptions[buttonPosition][rp]
  if (!callRaise) {
    return 'N/A'
  }

  return callRaise[x][y] ? 'CALL' : 'FOLD'
}

const foldOrCall3betOr4bet = (hand: Hand, buttonPosition: number, raisePositions: ReadonlyArray<number>): Action => {
  const rp: number = raisePositions[raisePositions.length - 1]

  const _4BetOptions: { [key: number]: { [key: number]: ReadonlyArray<ReadonlyArray<boolean>> } } = {
    0: { 1: b4betsSb, 2: b4betsBb },
    1: { 0: co4betsB, 2: co4betsSb, 3: co4betsBb },
    2: { 1: mp4betsCo, 2: mp4betsB, 3: mp4betsSb, 4: mp4betsBb },
    3: {
      1: utg4betsMp,
      2: utg4betsCo,
      3: utg4betsB,
      4: utg4betsSb,
      5: utg4betsBb,
    },
    4: {},
    5: {},
  }

  const [x, y] = xyInTable(hand)

  const _4Bet = _4BetOptions[buttonPosition][rp]
  if (_4Bet?.[x][y]) {
    return '4 BET'
  }

  const call3betOptions: { [key: number]: { [key: number]: ReadonlyArray<ReadonlyArray<boolean>> } } = {
    0: { 1: bCalls3betSb, 2: bCalls3betBb },
    1: { 1: coCalls3betB, 2: coCalls3betSb, 3: coCalls3betBb },
    2: {
      1: mpCalls3betCo,
      2: mpCalls3betB,
      3: mpCalls3betSb,
      4: mpCalls3betBb,
    },
    3: {
      1: utgCalls3betMp,
      2: utgCalls3betCo,
      3: utgCalls3betB,
      4: utgCalls3betSb,
      5: utgCalls3betBb,
    },
    4: {},
    5: { 1: sbCalls3betBb },
  }

  const call3Bet = call3betOptions[buttonPosition][rp]
  if (!call3Bet) {
    return 'N/A'
  }

  return call3Bet[x][y] ? 'CALL 3 BET' : 'FOLD'
}

const gto = (buttonPosition: number, raisePositions: ReadonlyArray<number>, hand: Hand): Action => {
  if (hand.card1 === null || hand.card2 === null) {
    return 'N/A'
  }

  if (raisePositions.length === 0) {
    return raiseOrFold(hand, buttonPosition)
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
