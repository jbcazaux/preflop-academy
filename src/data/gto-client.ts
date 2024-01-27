import { fetchPushOrFold, fetchRange } from 'api/ranges'
import { queryClient } from 'app/lib/clientProviders'
import Hand from 'domain/hand'
import Move from 'domain/move'
import Position from 'domain/position'

const openOrFold = async (hand: Hand, heroPosition: Position): Promise<Move> => {
  const openRange = await queryClient.fetchQuery({
    queryKey: ['range', Move.OPEN, heroPosition],
    queryFn: () => fetchRange(Move.OPEN, heroPosition),
  })

  if (!openRange) {
    return Move.FOLD
  }
  const combo = hand.asCombo()
  return openRange[combo] ? Move.OPEN : Move.FOLD
}

const foldOrCallOr3bet = async (hand: Hand, hero: Position, raisePositions: ReadonlyArray<Position>): Promise<Move> => {
  const initialRaiser = raisePositions[0]
  const combo = hand.asCombo()

  const _3BetRange = await queryClient.fetchQuery({
    queryKey: ['range', Move._3BET, hero, initialRaiser],
    queryFn: () => fetchRange(Move._3BET, hero, initialRaiser),
  })

  if (_3BetRange[combo]) {
    return Move._3BET
  }

  const callRange = await queryClient.fetchQuery({
    queryKey: ['range', Move.CALL, hero, initialRaiser],
    queryFn: () => fetchRange(Move.CALL, hero, initialRaiser),
  })

  return callRange[combo] ? Move.CALL : Move.FOLD
}

const foldOrCall3betOr4bet = async (
  hand: Hand,
  hero: Position,
  raisePositions: ReadonlyArray<Position>
): Promise<Move | null> => {
  const lastRaiser = raisePositions[raisePositions.length - 1]
  const combo = hand.asCombo()

  const _4BetRange = await queryClient.fetchQuery({
    queryKey: ['range', Move._4BET, hero, lastRaiser],
    queryFn: () => fetchRange(Move._4BET, hero, lastRaiser),
  })

  if (_4BetRange[combo]) {
    return Move._4BET
  }

  const _3BetsRange = await queryClient.fetchQuery({
    queryKey: ['range', Move.CALL3BET, hero, lastRaiser],
    queryFn: () => fetchRange(Move.CALL3BET, hero, lastRaiser),
  })

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

export const gtoPushFold = async (hero: Position, hand: Hand, stack: number): Promise<Move | null> => {
  if (hand.card1 === null || hand.card2 === null) {
    return Promise.resolve(null)
  }
  const combo = hand.asCombo()

  const pushFoldRange = await queryClient.fetchQuery({
    queryKey: ['pushFold', hero, stack],
    queryFn: () => fetchPushOrFold(stack, hero),
  })
  if (!pushFoldRange) {
    return Promise.resolve(null)
  }

  return pushFoldRange[combo] ? Move.ALL_IN : Move.FOLD
}
