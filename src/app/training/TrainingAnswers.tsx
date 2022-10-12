import Vertical from 'components/layout/Vertical'
import Button from 'components/Button'
import Move from 'domain/move'
import { useEffect, useMemo, useState } from 'react'
import getVilainPosition, { getHeroPosition } from 'utils/playerPosition'
import Position from 'domain/position'
import styled from 'styled-components'
import Action from 'domain/action'
import ButtonPosition from 'domain/buttonPosition'

const TrainingAnswersContainer = styled(Vertical)`
  align-items: center;
`

interface IAnswerWrapper {
  correct: boolean
  answered: boolean
}
const AnswerWrapper = styled.div<IAnswerWrapper>`
  border: ${({ correct, answered }) =>
    !answered ? '2px solid transparent' : correct ? '2px solid green' : '2px solid red'};
  margin: 8px 0;
`

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
  <AnswerWrapper correct={chosenAnswer === goodAnswer} answered={!!chosenAnswer && chosenAnswer === move}>
    <Button
      onClick={() => !chosenAnswer && onClick(move)}
      disabled={disabled || (!!chosenAnswer && chosenAnswer !== move)}
      {...props}
    >
      {move}
    </Button>
  </AnswerWrapper>
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
  const hero = useMemo(() => getHeroPosition(buttonPosition), [buttonPosition])
  const raises = useMemo(
    () => actions.map(a => getVilainPosition(a.position, buttonPosition)),
    [buttonPosition, actions]
  )

  useEffect(() => {
    setMyAnswer(null)
  }, [buttonPosition, actions])

  const handleClick = (move: Move) => {
    setMyAnswer(move)
    setAnswer(move)
  }

  return (
    <TrainingAnswersContainer>
      <AnswerButton move={Move.FOLD} active onClick={handleClick} goodAnswer={goodAnswer} chosenAnswer={myAnswer} />
      <AnswerButton
        active
        move={Move.OPEN}
        onClick={handleClick}
        goodAnswer={goodAnswer}
        disabled={hero === Position.BB || raises.length > 0}
        chosenAnswer={myAnswer}
      />
      <AnswerButton
        active
        move={Move.CALL}
        onClick={handleClick}
        goodAnswer={goodAnswer}
        disabled={raises.length !== 1}
        chosenAnswer={myAnswer}
      />
      <AnswerButton
        active
        move={Move._3BET}
        onClick={handleClick}
        goodAnswer={goodAnswer}
        disabled={raises.length !== 1}
        chosenAnswer={myAnswer}
      />
      <AnswerButton
        active
        move={Move.CALL3BET}
        onClick={handleClick}
        goodAnswer={goodAnswer}
        disabled={raises.length !== 2}
        chosenAnswer={myAnswer}
      />
      <AnswerButton
        active
        move={Move._4BET}
        onClick={handleClick}
        goodAnswer={goodAnswer}
        disabled={raises.length !== 2}
        chosenAnswer={myAnswer}
      />
      <Next active={!!myAnswer} disabled={!myAnswer} onClick={next} color="secondary">
        NEXT
      </Next>
    </TrainingAnswersContainer>
  )
}

const Next = styled(Button)`
  margin-top: 24px;
`

export default TrainingAnswers
