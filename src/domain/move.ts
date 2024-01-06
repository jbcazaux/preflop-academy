enum Move {
  OPEN = 'OPEN',
  CALL = 'CALL',
  _3BET = '3BET',
  CALL3BET = 'CALL 3 BET',
  _4BET = '4 BET',
  FOLD = 'FOLD',
  ALL_IN = 'ALL_IN',
}
export default Move

const urlParamToMoveMap = new Map<string, Move>([
  ['open', Move.OPEN],
  ['call', Move.CALL],
  ['3-bet', Move._3BET],
  ['call-3-bet', Move.CALL3BET],
  ['4-bet', Move._4BET],
  ['fold', Move.FOLD],
  ['all-in', Move.ALL_IN],
])
const moveToUrlParamMap = new Map<Move, string>([
  [Move.OPEN, 'open'],
  [Move.CALL, 'call'],
  [Move._3BET, '3-bet'],
  [Move.CALL3BET, 'call-3-bet'],
  [Move._4BET, '4-bet'],
  [Move.FOLD, 'fold'],
  [Move.ALL_IN, 'all-in'],
])
export const urlParamToMove = (value: string): Move | undefined => urlParamToMoveMap.get(value)
export const moveToUrlParam = (value: Move | null): string | undefined =>
  value ? moveToUrlParamMap.get(value) : undefined
