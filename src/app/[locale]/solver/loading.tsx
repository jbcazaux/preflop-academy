'use client'

import PokerTable from 'components/PokerTable/PokerTable'
import Board from 'domain/board'

const Loading = () => (
  <PokerTable
    buttonPosition={0}
    onButtonChange={() => {}}
    actions={[]}
    addRaisePosition={() => {}}
    board={Board.newBoard}
    width={500}
  />
)

export default Loading
