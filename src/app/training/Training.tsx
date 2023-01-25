import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import PokerTable from 'components/PokerTable/PokerTable'
import Hand from 'domain/hand'
import useWindowSize from 'components/useWindowSize'
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
import { useTranslation } from 'react-i18next'
import HandDisplay from 'components/HandDisplay'

const Text = styled.div`
  display: flex;
  font-weight: bolder;
  margin: 10px 0;
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
  const trainingContainerRef = useRef<HTMLDivElement>(null)
  const [hand, setHand] = useState<Hand>(Hand.newHand)
  const [actions, setActions] = useState<ReadonlyArray<Action>>([])
  const [guess, setGuess] = useState<Move | null>(null)
  const [goodAnswer, setGoodAnswer] = useState<Move | null>(null)
  const [score, setScore] = useState<Score>(new Score())
  const [heroPosition, setHeroPosition] = useState<Position | null>(heroPosition2)
  const { t } = useTranslation()
  const theme = useContext(ThemeContext)

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

  const sideMenuWidth = windowSize.width <= theme.breakpoints.tablet ? 300 : 375
  return (
    <>
      <SideMenu position="right" width={sideMenuWidth} title="Ranges">
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
        <Margin>
          <Text>{t('training.ask-move')}</Text>
          <TrainingAnswers
            buttonPosition={buttonPosition}
            actions={actions}
            goodAnswer={goodAnswer}
            setAnswer={setGuess}
            next={newRandomPlay}
          />
          <Text>{`${t('training.score')} ${score.score} / ${score.total}`}</Text>
        </Margin>
      </Vertical>
    </>
  )
}

export default Training
