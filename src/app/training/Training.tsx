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
import random from 'app/utils/random'
import {getButtonPositionForCall, getButtonPositionForOpen, getRandomMoveType} from 'app/training/trainingDistribution'
import Move from 'domain/move'
import PreFlopSolver from 'app/PreFlopSolver'

const Deck = styled.div`
  display: flex;
  flex-direction: column;
`

const Color = styled.div`
  display: flex;
  flex-direction: row;
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

const Training: React.VFC = () => {
  const [buttonPosition, setButtonPosition] = useState(0)
  const [hand, setHand] = useState<Hand>(Hand.newHand)
  const [init, setInit] = useState<boolean>(true)
  const [raisePositions, setRaisePositions] = useState<ReadonlyArray<number>>([])
  const [guess, setGuess] = useState<Move | null>(null)
  const windowSize = useWindowSize()

  const setRandomPlay = useCallback(() => {
    setGuess(null)
    setHand(Hand.random())
    const randomMoveType = getRandomMoveType()
    switch (randomMoveType) {
      case Move.OPEN: {
        const newButtonPosition = getButtonPositionForOpen()
        setButtonPosition(newButtonPosition)
        setRaisePositions([])
        break
      }
      case Move.CALL: {
        const newButtonPosition = getButtonPositionForCall()
        setButtonPosition(newButtonPosition)
        setRaisePositions(getRandomRaise(newButtonPosition))
        break
      }
      default: {
        setRaisePositions([0, 1])
        break
      }
    }
  }, [])

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
      <TrainingAnswers
        buttonPosition={buttonPosition}
        raisePositions={raisePositions}
        setAnswer={setGuess}
        next={setRandomPlay}
      />
      <Vertical>
        {guess && <PreFlopSolver hand={hand} buttonPosition={buttonPosition} raisePositions={raisePositions} />}
      </Vertical>
    </Horizontal>
  )
}

export default Training
