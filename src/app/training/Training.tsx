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
import PreFlopSolver from 'app/PreFlopSolver'
import { getRandomMoveType } from 'app/training/trainingMoveDistribution'
import randomHandInRange from 'utils/randomHandInRange'
import getVilainPosition, { getHeroPosition } from 'utils/playerPosition'
import gto from 'data/gto'
import Score from 'domain/Score'
import Deck from 'app/Deck'

const ScoreDisplay = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
`

const noop: () => void = () => {
  /*NOOP*/
}

const getRandomRaisePositions = (buttonPosition: number): ReadonlyArray<number> => {
  switch (buttonPosition) {
    case 0:
      return [random(3, 5)]
    case 1:
      return [random(4, 5)]
    case 2:
      return [5]
    case 4:
      return [random(1, 5)]
    case 5:
      return [random(2, 5)]
    default:
      return []
  }
}

const getRandomRaisePosition3Bet = (buttonPosition: number): ReadonlyArray<number> => {
  switch (buttonPosition) {
    case 0:
      return [0, random(1, 2)]
    case 1:
      return [0, random(1, 3)]
    case 2:
      return [0, random(1, 4)]
    case 3:
      return [0, random(1, 5)]
    case 4:
      return []
    default:
      return [0, 1]
  }
}

const Training: React.VFC = () => {
  const [buttonPosition, setButtonPosition] = useState(0)
  const [hand, setHand] = useState<Hand>(Hand.newHand)
  const [raisePositions, setRaisePositions] = useState<ReadonlyArray<number>>([])
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
        setRaisePositions([])
        break
      }
      case Move.CALL: {
        setHand(Hand.random)
        const newButtonPosition = getButtonPositionForCall()
        setButtonPosition(newButtonPosition)
        setRaisePositions(getRandomRaisePositions(newButtonPosition))
        break
      }
      case Move.CALL3BET: {
        const newButtonPosition = getButtonPositionFor3BetCall()
        setButtonPosition(newButtonPosition)
        setHand(randomHandInRange(Move.OPEN, getHeroPosition(newButtonPosition)))
        setRaisePositions(getRandomRaisePosition3Bet(newButtonPosition))
        break
      }
    }
  }, [])

  useEffect(() => {
    const rp = raisePositions.map(v => getVilainPosition(v, buttonPosition))
    const answerOK = gto(getHeroPosition(buttonPosition), rp, hand)
    setGoodAnswer(answerOK)
  }, [buttonPosition, hand, raisePositions])

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
          raisePositions={raisePositions}
          addRaisePosition={noop}
          width={width}
        />
        <Deck onClick={noop} hand={hand} />
      </Vertical>
      <Vertical>
        <ScoreDisplay>What's your move ?</ScoreDisplay>
        <TrainingAnswers
          buttonPosition={buttonPosition}
          raisePositions={raisePositions}
          goodAnswer={goodAnswer}
          setAnswer={setGuess}
          next={setRandomPlay}
        />
        <ScoreDisplay>Score : {`${score.score} / ${score.total}`}</ScoreDisplay>
      </Vertical>
      <Vertical>
        {guess && <PreFlopSolver hand={hand} buttonPosition={buttonPosition} raisePositions={raisePositions} />}
      </Vertical>
    </Horizontal>
  )
}

export default Training
