'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'

import style from './TrainingAnswers.module.scss'

import Button from 'components/button/Button'
import Horizontal from 'components/layout/Horizontal'
import Vertical from 'components/layout/Vertical'
import Action from 'domain/action'
import ButtonPosition from 'domain/buttonPosition'
import Move from 'domain/move'
import Position, { heroPositionFromButtonPosition } from 'domain/position'

interface AnswerButtonProps {
  active?: boolean
  color?: string
  disabled?: boolean
  onClick: (move: Move) => void
  move: Move
  goodAnswer: Move | null
  chosenAnswer: Move | null
}

const AnswerButton = ({ move, chosenAnswer, goodAnswer, onClick, disabled, ...props }: AnswerButtonProps) => (
  <div
    className={classNames(style['answer-wrapper'], {
      [style.correct]: !!chosenAnswer && chosenAnswer === move && chosenAnswer === goodAnswer,
      [style.wrong]: !!chosenAnswer && chosenAnswer === move && chosenAnswer !== goodAnswer,
      [style.notAnswered]: !chosenAnswer || chosenAnswer !== move,
    })}
  >
    <Button
      onClick={() => !chosenAnswer && onClick(move)}
      disabled={disabled || (!!chosenAnswer && chosenAnswer !== move)}
      {...props}
    >
      {move}
    </Button>
  </div>
)

interface Props {
  buttonPosition: ButtonPosition
  goodAnswer: Move | null
  next: () => void
  actions: ReadonlyArray<Action>
  setAnswer: (move: Move) => void
}

const TrainingAnswers = ({ buttonPosition, actions, setAnswer, goodAnswer, next }: Props) => {
  const [myAnswer, setMyAnswer] = useState<Move | null>(null)
  const hero = useMemo(() => heroPositionFromButtonPosition(buttonPosition), [buttonPosition])
  const t = useTranslations('training')

  useEffect(() => {
    setMyAnswer(null)
  }, [buttonPosition, actions])

  const handleClick = (move: Move) => {
    setMyAnswer(move)
    setAnswer(move)
  }

  return (
    <Vertical className={style.container}>
      <Horizontal className={style.buttons}>
        <AnswerButton move={Move.FOLD} active onClick={handleClick} goodAnswer={goodAnswer} chosenAnswer={myAnswer} />
        <AnswerButton
          active
          move={Move.OPEN}
          onClick={handleClick}
          goodAnswer={goodAnswer}
          disabled={hero === Position.BB || actions.length > 0}
          chosenAnswer={myAnswer}
        />
        <AnswerButton
          active
          move={Move.CALL}
          onClick={handleClick}
          goodAnswer={goodAnswer}
          disabled={actions.length !== 1}
          chosenAnswer={myAnswer}
        />
        <AnswerButton
          active
          move={Move._3BET}
          onClick={handleClick}
          goodAnswer={goodAnswer}
          disabled={actions.length !== 1}
          chosenAnswer={myAnswer}
        />
        <AnswerButton
          active
          move={Move.CALL3BET}
          onClick={handleClick}
          goodAnswer={goodAnswer}
          disabled={actions.length !== 2}
          chosenAnswer={myAnswer}
        />
        <AnswerButton
          active
          move={Move._4BET}
          onClick={handleClick}
          goodAnswer={goodAnswer}
          disabled={actions.length !== 2}
          chosenAnswer={myAnswer}
        />
      </Horizontal>
      <Button className={style.next} active={!!myAnswer} disabled={!myAnswer} onClick={next} color="secondary">
        {t('next')}
      </Button>
    </Vertical>
  )
}

export default TrainingAnswers
