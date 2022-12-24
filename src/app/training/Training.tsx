import {useCallback, useEffect, useState} from 'react'
import styled from 'styled-components'
import PokerTable from 'components/PokerTable'
import Hand from 'domain/hand'
import useWindowSize from 'components/useWindowSize'
import Horizontal from 'components/layout/Horizontal'
import Vertical from 'components/layout/Vertical'
import TrainingAnswers from 'app/training/TrainingAnswers'
import {randomPosition} from 'utils/random'
import Move from 'domain/move'
import PreFlopSolver from 'app/solver/PreFlopSolver'
import {getRandomMoveType} from 'app/training/trainingMoveDistribution'
import randomHandInRange from 'utils/randomHandInRange'
import gto from 'data/gto'
import Score from 'domain/Score'
import Action from 'domain/action'
import Board from 'domain/board'
import noop from 'utils/noop'
import ButtonPosition from 'domain/buttonPosition'
import Card from 'components/Card'
import Position, {heroPositionByButtonPosition} from 'domain/position'

const Text = styled.div`
  display: flex;
  font-weight: bolder;
  margin: 10px 0;
`

const HandDisplay = styled(Horizontal)`
  flex: 0;
  justify-content: center;
`

const getRandomOpenActionForCall = (buttonPosition: ButtonPosition): ReadonlyArray<Action> => {
  switch (buttonPosition) {
    case 0:
      return [new Action(randomPosition([Position.UTG, Position.MP, Position.CO]), Move.OPEN)]
    case 1:
      return [new Action(randomPosition([Position.UTG, Position.MP]), Move.OPEN)]
    case 2:
      return [new Action(Position.UTG, Move.OPEN)]
    case 4:
      return [new Action(randomPosition([Position.UTG, Position.MP, Position.CO, Position.B, Position.SB]), Move.OPEN)]
    case 5:
      return [new Action(randomPosition([Position.UTG, Position.MP, Position.CO, Position.B]), Move.OPEN)]
    default:
      return []
  }
}

const getRandomActionForCall3Bet = (buttonPosition: ButtonPosition): ReadonlyArray<Action> => {
  switch (buttonPosition) {
    case 0:
      return [new Action(Position.B, Move.OPEN), new Action(randomPosition([Position.SB, Position.BB]), Move._3BET)]
    case 1:
      return [
        new Action(Position.CO, Move.OPEN),
        new Action(randomPosition([Position.B, Position.SB, Position.BB]), Move._3BET),
      ]
    case 2:
      return [
        new Action(Position.MP, Move.OPEN),
        new Action(randomPosition([Position.CO, Position.B, Position.SB, Position.BB]), Move._3BET),
      ]
    case 3:
      return [
        new Action(Position.UTG, Move.OPEN),
        new Action(randomPosition([Position.MP, Position.CO, Position.B, Position.SB, Position.BB]), Move._3BET),
      ]
    case 5:
      return [new Action(Position.SB, Move.OPEN), new Action(Position.BB, Move._3BET)]
    default:
      throw new Error('should not be there - getRandomActionForCall3Bet')
  }
}

interface Props {
  buttonPosition: ButtonPosition
  move: Move | null
}

const Training = ({ buttonPosition, move }: Props) => {
  const [hand, setHand] = useState<Hand>(Hand.newHand)
  const [actions, setActions] = useState<ReadonlyArray<Action>>([])
  const [guess, setGuess] = useState<Move | null>(null)
  const [goodAnswer, setGoodAnswer] = useState<Move | null>(null)
  const [score, setScore] = useState<Score>(new Score())

  const windowSize = useWindowSize()

  const setRandomPlay = useCallback(() => {
    setGuess(null)
    const newRandomMoveType = move || getRandomMoveType()
    switch (newRandomMoveType) {
      case Move.OPEN: {
        setHand(Hand.random)
        setActions([])
        break
      }
      case Move.CALL: {
        setHand(Hand.random)
        setActions(getRandomOpenActionForCall(buttonPosition))
        break
      }
      case Move.CALL3BET: {
        setHand(randomHandInRange(Move.OPEN, heroPositionByButtonPosition(buttonPosition)))
        setActions(getRandomActionForCall3Bet(buttonPosition))
        break
      }
    }
  }, [move, buttonPosition])

  useEffect(() => {
    const actionPositions = actions.map(action => action.position)
    const answerOK = gto(heroPositionByButtonPosition(buttonPosition), actionPositions, hand)
    setGoodAnswer(answerOK)
  }, [buttonPosition, hand, actions])

  useEffect(() => {
    if (!guess || !goodAnswer) return
    guess === goodAnswer ? setScore(prev => prev.goodAnswer()) : setScore(prev => prev.badAnswer())
  }, [guess, goodAnswer])

  useEffect(setRandomPlay, [setRandomPlay])

  const width = Math.min(windowSize.width / 1.1, 700)

  return (
    <Horizontal>
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
          next={setRandomPlay}
        />
        <Text>Score : {`${score.score} / ${score.total}`}</Text>
        {windowSize.width < 1024 && guess && (
          <PreFlopSolver hand={hand} buttonPosition={buttonPosition} actions={actions} board={Board.newBoard} />
        )}
      </Vertical>
      {windowSize.width >= 1024 && guess && (
        <PreFlopSolver hand={hand} buttonPosition={buttonPosition} actions={actions} board={Board.newBoard} />
      )}
    </Horizontal>
  )
}

export default Training
