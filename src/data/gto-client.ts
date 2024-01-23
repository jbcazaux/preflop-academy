import { fetchHintTable, fetchPushOrFold } from 'api/hintTables'
import { queryClient } from 'app/lib/clientProviders'
import Hand from 'domain/hand'
import Move from 'domain/move'
import Position from 'domain/position'

const openOrFold = async (hand: Hand, heroPosition: Position): Promise<Move | null> => {
  const [x, y] = hand.xyInRangeTable()
  const openHintsTable = await queryClient.fetchQuery({
    queryKey: ['hintsTable', Move.OPEN, heroPosition],
    queryFn: () => fetchHintTable(Move.OPEN, heroPosition),
  })
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

  const _3BetHintsTable = await queryClient.fetchQuery({
    queryKey: ['hintsTable', Move._3BET, hero, initialRaiser],
    queryFn: () => fetchHintTable(Move._3BET, hero, initialRaiser),
  })

  if (_3BetHintsTable?.[x][y]) {
    return Move._3BET
  }

  const callHintsTable = await queryClient.fetchQuery({
    queryKey: ['hintsTable', Move.CALL, hero, initialRaiser],
    queryFn: () => fetchHintTable(Move.CALL, hero, initialRaiser),
  })

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

  const _4BetHintsTable = await queryClient.fetchQuery({
    queryKey: ['hintsTable', Move._4BET, hero, lastRaiser],
    queryFn: () => fetchHintTable(Move._4BET, hero, lastRaiser),
  })

  if (_4BetHintsTable?.[x][y]) {
    return Move._4BET
  }

  const _3BetsHintsTable = await queryClient.fetchQuery({
    queryKey: ['hintsTable', Move.CALL3BET, hero, lastRaiser],
    queryFn: () => fetchHintTable(Move.CALL3BET, hero, lastRaiser),
  })

  return _3BetsHintsTable?.[x][y] ? Move.CALL3BET : Move.FOLD
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

  const pushFoldHintsTable = await queryClient.fetchQuery({
    queryKey: ['pushFold', hero, stack],
    queryFn: () => fetchPushOrFold(stack, hero),
  })
  if (!pushFoldHintsTable) {
    return Promise.resolve(null)
  }

  return pushFoldHintsTable[x][y] ? Move.ALL_IN : Move.FOLD
}
