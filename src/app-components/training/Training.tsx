'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import PreFlopSolver from 'app-components/solver/PreFlopSolver'
import gto from 'data/gto-client'
import Action from 'domain/action'
import Board from 'domain/board'
import Hand from 'domain/hand'
import Move from 'domain/move'
import Position, { buttonPositionFromHeroPosition } from 'domain/position'
import Score from 'domain/Score'
import { useTranslations } from 'next-intl'
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

const Training = ({ heroPosition: heroPositionDefault, move }: Props) => {
  const trainingContainerRef = useRef<HTMLDivElement>(null)
  const [hand, setHand] = useState<Hand>(Hand.newHand)
  const [actions, setActions] = useState<ReadonlyArray<Action>>([])
  const [guess, setGuess] = useState<Move | null>(null)
  const [goodAnswer, setGoodAnswer] = useState<Move | null>(null)
  const [score, setScore] = useState<Score>(new Score())
  const [heroPosition, setHeroPosition] = useState<Position | null>(heroPositionDefault)

  const t = useTranslations('training')

  const windowSize = useWindowSize()
  const buttonPosition = heroPosition ? buttonPositionFromHeroPosition(heroPosition) : 0

  const newRandomPlay = useCallback(async () => {
    setGuess(null)
    const play = await setRandomPlay(move, heroPositionDefault)
    setHand(play.hand)
    setActions(play.actions)
    setHeroPosition(play.heroPosition)
  }, [move, heroPositionDefault])

  useEffect(() => {
    // set good answer
    const effect = async () => {
      const actionPositions = actions.map(action => action.position)
      const answerOK = heroPosition ? await gto(heroPosition, actionPositions, hand) : null
      setGoodAnswer(answerOK)
    }
    effect()
  }, [heroPosition, hand, actions])

  useEffect(() => {
    const playerHasNotYetAnwsered = !guess || !goodAnswer
    // set score
    if (playerHasNotYetAnwsered) return
    guess === goodAnswer ? setScore(prev => prev.goodAnswer()) : setScore(prev => prev.badAnswer())
  }, [guess, goodAnswer])

  const getPokerTableWidth = () => {
    if (trainingContainerRef.current) {
      const boundingRect = trainingContainerRef.current.getBoundingClientRect()
      return boundingRect.width
    }
    return windowSize.width
  }

  useEffect(() => {
    newRandomPlay()
  }, [newRandomPlay])

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
          <div className={style.text}>{t('ask-move')}</div>
          <TrainingAnswers
            buttonPosition={buttonPosition}
            actions={actions}
            goodAnswer={goodAnswer}
            setAnswer={setGuess}
            next={newRandomPlay}
          />
          <div className={style.text}>{`${t('score')} ${score.score} / ${score.total}`}</div>
        </div>
      </Vertical>
    </>
  )
}

export default Training
