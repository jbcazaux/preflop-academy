import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import PokerTable from 'components/PokerTable'
import Hand from 'domain/hand'
import useWindowSize from 'components/useWindowSize'
import Horizontal from 'components/layout/Horizontal'
import Vertical from 'components/layout/Vertical'
import TrainingAnswers from 'app/training/TrainingAnswers'
import Move from 'domain/move'
import PreFlopSolver from 'app/solver/PreFlopSolver'
import gto from 'data/gto'
import Score from 'domain/Score'
import Action from 'domain/action'
import noop from 'utils/noop'
import Card from 'components/Card'
import Position, { buttonPositionFromHeroPosition } from 'domain/position'
import SideMenu from 'components/layout/SideMenu/SideMenu'
import Board from 'domain/board'
import { setRandomPlay } from 'app/training/setPlay'

const Text = styled.div`
  display: flex;
  font-weight: bolder;
  margin: 10px 0;
`

const HandDisplay = styled(Horizontal)`
  flex: 0;
  justify-content: center;
`

interface Props {
  heroPosition: Position
  move: Move | null
}

const Training = ({ heroPosition, move }: Props) => {
  const [hand, setHand] = useState<Hand>(Hand.newHand)
  const [actions, setActions] = useState<ReadonlyArray<Action>>([])
  const [guess, setGuess] = useState<Move | null>(null)
  const [goodAnswer, setGoodAnswer] = useState<Move | null>(null)
  const [score, setScore] = useState<Score>(new Score())

  const windowSize = useWindowSize()
  const buttonPosition = buttonPositionFromHeroPosition(heroPosition)

  const newRandomPlay = useCallback(() => {
    setGuess(null)
    const play = setRandomPlay(move, heroPosition)
    setHand(play.hand)
    setActions(play.actions)
  }, [move, heroPosition])

  useEffect(() => {
    const actionPositions = actions.map(action => action.position)
    const answerOK = gto(heroPosition, actionPositions, hand)
    setGoodAnswer(answerOK)
  }, [heroPosition, hand, actions])

  useEffect(() => {
    if (!guess || !goodAnswer) return
    guess === goodAnswer ? setScore(prev => prev.goodAnswer()) : setScore(prev => prev.badAnswer())
  }, [guess, goodAnswer])

  useEffect(newRandomPlay, [newRandomPlay])

  const width = Math.min(windowSize.width / 1.1, 700)

  return (
    <>
      <SideMenu position="right" width={400} title="Ranges">
        <PreFlopSolver
          hand={hand}
          buttonPosition={buttonPosition}
          actions={actions}
          board={Board.newBoard}
          displayStats={false}
        />
      </SideMenu>
      <Vertical>
        <PokerTable
          buttonPosition={buttonPosition}
          onButtonChange={noop}
          actions={actions}
          addRaisePosition={noop}
          width={width}
        />
        <HandDisplay>
          {hand.card1 && <Card card={hand.card1} />}
          {hand.card2 && <Card card={hand.card2} />}
        </HandDisplay>
        <Text>What's your move ?</Text>
        <TrainingAnswers
          buttonPosition={buttonPosition}
          actions={actions}
          goodAnswer={goodAnswer}
          setAnswer={setGuess}
          next={newRandomPlay}
        />
        <Text>Score : {`${score.score} / ${score.total}`}</Text>
      </Vertical>
    </>
  )
}

export default Training
