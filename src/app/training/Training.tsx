import React, {useCallback, useEffect, useState} from 'react'
import styled from 'styled-components'
import PokerTable from 'components/PokerTable'
import Hand from 'domain/hand'
import useWindowSize from 'components/useWindowSize'
import Horizontal from 'components/layout/Horizontal'
import Vertical from 'components/layout/Vertical'
import TrainingAnswers from 'app/training/TrainingAnswers'
import random from 'utils/random'
import Move from 'domain/move'
import PreFlopSolver from 'app/solver/PreFlopSolver'
import {getRandomMoveType} from 'app/training/trainingMoveDistribution'
import randomHandInRange from 'utils/randomHandInRange'
import getVilainPosition, {getHeroPosition} from 'utils/playerPosition'
import gto from 'data/gto'
import Score from 'domain/Score'
import Deck from 'app/Deck'
import Action from 'domain/action'
import Board from 'domain/board'
import noop from 'utils/noop'
import Position from 'domain/position'

const Text = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
`

const getRandomOpenActionForCall = (buttonPosition: Position): ReadonlyArray<Action> => {
  switch (buttonPosition) {
    case Position.B:
      return [new Action(random(3, 5), Move.OPEN)]
    case Position.SB:
      return [new Action(random(4, 5), Move.OPEN)]
    case Position.BB:
      return [new Action(5, Move.OPEN)]
    case Position.MP:
      return [new Action(random(1, 5), Move.OPEN)]
    case Position.CO:
      return [new Action(random(2, 5), Move.OPEN)]
    default:
      return []
  }
}

const getRandomActionForCall3Bet = (buttonPosition: Position): ReadonlyArray<Action> => {
  switch (buttonPosition) {
    case Position.B:
      return [new Action(0, Move.OPEN), new Action(random(1, 2), Move._3BET)]
    case Position.SB:
      return [new Action(0, Move.OPEN), new Action(random(1, 3), Move._3BET)]
    case Position.BB:
      return [new Action(0, Move.OPEN), new Action(random(1, 4), Move._3BET)]
    case Position.UTG:
      return [new Action(0, Move.OPEN), new Action(random(1, 5), Move._3BET)]
    case Position.MP:
      return []
    default:
      return [new Action(0, Move.OPEN), new Action(1, Move._3BET)]
  }
}


interface Props {
  buttonPosition: Position
}


const Training: React.VFC<Props> = ({buttonPosition}) => {
  const [hand, setHand] = useState<Hand>(Hand.newHand)
  const [actions, setActions] = useState<ReadonlyArray<Action>>([])
  const [guess, setGuess] = useState<Move | null>(null)
  const [goodAnswer, setGoodAnswer] = useState<Move | null>(null)
  const [score, setScore] = useState<Score>(new Score())

  const windowSize = useWindowSize()

  const setRandomPlay = useCallback(() => {
    setGuess(null)
    const newRandomMoveType = getRandomMoveType()
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
        setHand(randomHandInRange(Move.OPEN, getHeroPosition(buttonPosition)))
        setActions(getRandomActionForCall3Bet(buttonPosition))
        break
      }
    }
  }, [])

  useEffect(() => {
    const vilain = actions.map(v => getVilainPosition(v.position, buttonPosition))
    const answerOK = gto(getHeroPosition(buttonPosition), vilain, hand)
    setGoodAnswer(answerOK)
  }, [buttonPosition, hand, actions])

  useEffect(() => {
    if (!guess || !goodAnswer) return
    guess === goodAnswer ? setScore(prev => prev.goodAnswer()) : setScore(prev => prev.badAnswer())
  }, [guess, goodAnswer])

  useEffect(setRandomPlay, [setRandomPlay])

  const width = Math.min(500, Math.max(250, (windowSize.width * 2) / 3))

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
        <Deck onClick={noop} hand={hand} board={Board.newBoard} />
      </Vertical>
      <Vertical>
        <Text>What's your move ?</Text>
        <TrainingAnswers
          buttonPosition={buttonPosition}
          actions={actions}
          goodAnswer={goodAnswer}
          setAnswer={setGuess}
          next={setRandomPlay}
        />
        <Text>Score : {`${score.score} / ${score.total}`}</Text>
      </Vertical>
      <Vertical>
        {guess && (
          <PreFlopSolver hand={hand} buttonPosition={buttonPosition} actions={actions} board={Board.newBoard} />
        )}
      </Vertical>
    </Horizontal>
  )
}

export default Training
