import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import PokerTable from 'components/PokerTable'
import Hand from 'domain/hand'
import useWindowSize from 'components/useWindowSize'
import Horizontal from 'components/layout/Horizontal'
import Vertical from 'components/layout/Vertical'
import TrainingAnswers from 'app/training/TrainingAnswers'
import random from 'utils/random'
import {
  getButtonPositionFor3BetCall,
  getButtonPositionForCall,
  getButtonPositionForOpen,
} from 'app/training/trainingButtonDistribution'
import Move from 'domain/move'
import PreFlopSolver from 'app/solver/PreFlopSolver'
import { getRandomMoveType } from 'app/training/trainingMoveDistribution'
import randomHandInRange from 'utils/randomHandInRange'
import getVilainPosition, { getHeroPosition } from 'utils/playerPosition'
import gto from 'data/gto'
import Score from 'domain/Score'
import Deck from 'app/Deck'
import Action from 'domain/action'
import Board from 'domain/board'
import noop from 'utils/noop'

const Text = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
`

const getRandomActions = (buttonPosition: number): ReadonlyArray<Action> => {
  switch (buttonPosition) {
    case 0:
      return [new Action(random(3, 5), Move.OPEN)]
    case 1:
      return [new Action(random(4, 5), Move.OPEN)]
    case 2:
      return [new Action(5, Move.OPEN)]
    case 4:
      return [new Action(random(1, 5), Move.OPEN)]
    case 5:
      return [new Action(random(2, 5), Move.OPEN)]
    default:
      return []
  }
}

const getRandomRaisePosition3Bet = (buttonPosition: number): ReadonlyArray<Action> => {
  switch (buttonPosition) {
    case 0:
      return [new Action(0, Move.OPEN), new Action(random(1, 2), Move._3BET)]
    case 1:
      return [new Action(0, Move.OPEN), new Action(random(1, 3), Move._3BET)]
    case 2:
      return [new Action(0, Move.OPEN), new Action(random(1, 4), Move._3BET)]
    case 3:
      return [new Action(0, Move.OPEN), new Action(random(1, 5), Move._3BET)]
    case 4:
      return []
    default:
      return [new Action(0, Move.OPEN), new Action(1, Move._3BET)]
  }
}

const Training: React.VFC = () => {
  const [buttonPosition, setButtonPosition] = useState(0)
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
        const newButtonPosition = getButtonPositionForOpen()
        setButtonPosition(newButtonPosition)
        setActions([])
        break
      }
      case Move.CALL: {
        setHand(Hand.random)
        const newButtonPosition = getButtonPositionForCall()
        setButtonPosition(newButtonPosition)
        setActions(getRandomActions(newButtonPosition))
        break
      }
      case Move.CALL3BET: {
        const newButtonPosition = getButtonPositionFor3BetCall()
        setButtonPosition(newButtonPosition)
        setHand(randomHandInRange(Move.OPEN, getHeroPosition(newButtonPosition)))
        setActions(getRandomRaisePosition3Bet(newButtonPosition))
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
