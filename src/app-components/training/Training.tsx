'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import PreFlopSolver from 'app-components/solver/PreFlopSolver'
import gto from 'data/gto'
import Action from 'domain/action'
import Board from 'domain/board'
import Hand from 'domain/hand'
import Move from 'domain/move'
import Position, { buttonPositionFromHeroPosition } from 'domain/position'
import Score from 'domain/Score'
import noop from 'utils/noop'

import HandDisplay from 'components/HandDisplay'
import SideMenu from 'components/layout/SideMenu/SideMenu'
import Vertical from 'components/layout/Vertical'
import PokerTable from 'components/PokerTable/PokerTable'
import useWindowSize from 'components/useWindowSize'

import { setRandomPlay } from './setPlay'
import TrainingAnswers from './TrainingAnswers'

import style from './Training.module.scss'

interface Props {
  heroPosition: Position | null
  move: Move | null
}

const Training = ({ heroPosition: heroPosition2, move }: Props) => {
  const trainingContainerRef = useRef<HTMLDivElement>(null)
  const [hand, setHand] = useState<Hand>(Hand.newHand)
  const [actions, setActions] = useState<ReadonlyArray<Action>>([])
  const [guess, setGuess] = useState<Move | null>(null)
  const [goodAnswer, setGoodAnswer] = useState<Move | null>(null)
  const [score, setScore] = useState<Score>(new Score())
  const [heroPosition, setHeroPosition] = useState<Position | null>(heroPosition2)
  //const { t } = useTranslations()

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

  const getPokerTableWidth = () => {
    if (trainingContainerRef.current) {
      const boundingRect = trainingContainerRef.current.getBoundingClientRect()
      return boundingRect.width
    }
    return windowSize.width
  }

  useEffect(newRandomPlay, [newRandomPlay])

  return (
    <>
      <SideMenu position="right" title="Ranges" className={style.menu}>
        <PreFlopSolver
          hand={hand}
          buttonPosition={buttonPosition}
          actions={actions}
          board={Board.newBoard}
          displayStats={false}
        />
      </SideMenu>
      <Vertical ref={trainingContainerRef}>
        <PokerTable
          buttonPosition={buttonPosition}
          onButtonChange={noop}
          actions={actions}
          addRaisePosition={noop}
          width={getPokerTableWidth()}
        />
        <HandDisplay hand={hand} />
        <div className={style.margin}>
          <div className={style.text}>'training.ask-move'</div>
          <TrainingAnswers
            buttonPosition={buttonPosition}
            actions={actions}
            goodAnswer={goodAnswer}
            setAnswer={setGuess}
            next={newRandomPlay}
          />
          <div className={style.text}>{`'training.score' ${score.score} / ${score.total}`}</div>
        </div>
      </Vertical>
    </>
  )
}

export default Training
