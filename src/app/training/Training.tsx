import Card from 'components/Card'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import styled from 'styled-components'
import { deck } from 'domain/cards'
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
import { getHeroPosition } from 'utils/playerPosition'
import gto from 'data/gto'
import Score from 'domain/Score'

const Deck = styled.div`
  display: flex;
  flex-direction: column;
`

const Color = styled.div`
  display: flex;
  flex-direction: row;
`

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

const getRandomRaise = (buttonPosition: number): ReadonlyArray<number> => {
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

const getRandomRaise3Bet = (buttonPosition: number): ReadonlyArray<number> => {
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
  const [init, setInit] = useState<boolean>(true)
  const [buttonPosition, setButtonPosition] = useState(0)
  const [hand, setHand] = useState<Hand>(Hand.newHand)
  const [raisePositions, setRaisePositions] = useState<ReadonlyArray<number>>([])
  const [guess, setGuess] = useState<Move | null>(null)
  const [score, setScore] = useState<Score>(new Score())
  const [randomMoveType, setRandomMoveType] = useState<Move | null>(null)

  const windowSize = useWindowSize()

  const setRandomPlay = useCallback(() => {
    setGuess(null)
    const newRandomMoveType = getRandomMoveType()
    setRandomMoveType(newRandomMoveType)
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
        setRaisePositions(getRandomRaise(newButtonPosition))
        break
      }
      case Move.CALL3BET: {
        const newButtonPosition = getButtonPositionFor3BetCall()
        setButtonPosition(newButtonPosition)
        setHand(randomHandInRange(Move.OPEN, getHeroPosition(newButtonPosition)))
        setRaisePositions(getRandomRaise3Bet(newButtonPosition))
        break
      }
    }
  }, [])

  useEffect(() => {
    if (!guess || !randomMoveType) return
    const answerOK = gto(getHeroPosition(buttonPosition), raisePositions, hand)
    guess === answerOK ? setScore(prev => prev.goodAnswer()) : setScore(prev => prev.badAnswer())
  }, [buttonPosition, guess, hand, raisePositions, randomMoveType])

  useLayoutEffect(() => {
    setInit(false)
  }, [])

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
        <Deck>
          {deck.map(colorDeck => (
            <Color key={colorDeck[0].color}>
              {colorDeck.map(card => (
                <Card
                  key={card.value}
                  card={card}
                  onClick={noop}
                  selected={init || (!hand.isEmpty() && hand.contains(card))}
                  mobile={windowSize.width <= 470}
                />
              ))}
            </Color>
          ))}
        </Deck>
      </Vertical>
      <Vertical>
        <ScoreDisplay>What's your move ?</ScoreDisplay>
        <TrainingAnswers
          buttonPosition={buttonPosition}
          raisePositions={raisePositions}
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
