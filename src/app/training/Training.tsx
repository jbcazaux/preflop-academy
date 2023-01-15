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
import Position, { buttonPositionFromHeroPosition } from 'domain/position'
import SideMenu from 'components/layout/SideMenu/SideMenu'
import Board from 'domain/board'
import { setRandomPlay } from 'app/training/setPlay'
import Card2 from 'components/Card2'

const Text = styled.div`
  display: flex;
  font-weight: bolder;
  margin: 10px 0;
`

const HandDisplay = styled(Horizontal)`
  flex: 0;
  justify-content: center;
`

const Margin = styled.div`
  margin: 0 auto;
  @media (${({ theme }) => theme.breakpoints.max.tablet}) {
    margin: 0 10vw;
  }
`

interface Props {
  heroPosition: Position | null
  move: Move | null
}

const Training = ({ heroPosition: heroPosition2, move }: Props) => {
  const [hand, setHand] = useState<Hand>(Hand.newHand)
  const [actions, setActions] = useState<ReadonlyArray<Action>>([])
  const [guess, setGuess] = useState<Move | null>(null)
  const [goodAnswer, setGoodAnswer] = useState<Move | null>(null)
  const [score, setScore] = useState<Score>(new Score())
  const [heroPosition, setHeroPosition] = useState<Position | null>(heroPosition2)

  const windowSize = useWindowSize()
  const buttonPosition = heroPosition ? buttonPositionFromHeroPosition(heroPosition) : 0

  const newRandomPlay = useCallback(() => {
    setGuess(null)
    const play = setRandomPlay(move, heroPosition2)
    setHand(play.hand)
    setActions(play.actions)
    setHeroPosition(play.heroPosition)
  }, [move, heroPosition2])

  useEffect(() => {
    // set good answer
    const actionPositions = actions.map(action => action.position)
    const answerOK = heroPosition ? gto(heroPosition, actionPositions, hand) : null
    setGoodAnswer(answerOK)
  }, [heroPosition, hand, actions])

  useEffect(() => {
    // set score
    if (!guess || !goodAnswer) return
    guess === goodAnswer ? setScore(prev => prev.goodAnswer()) : setScore(prev => prev.badAnswer())
  }, [guess, goodAnswer])

  useEffect(newRandomPlay, [newRandomPlay])

  const width = Math.min((windowSize.width - 100) / 1.1, 800)

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
          {hand.card1 && <Card2 card={hand.card1} />}
          {hand.card2 && <Card2 card={hand.card2} />}
        </HandDisplay>
        <Margin>
          <Text>What's your move ?</Text>
          <TrainingAnswers
            buttonPosition={buttonPosition}
            actions={actions}
            goodAnswer={goodAnswer}
            setAnswer={setGuess}
            next={newRandomPlay}
          />
          <Text>Score : {`${score.score} / ${score.total}`}</Text>
        </Margin>
      </Vertical>
    </>
  )
}

export default Training
