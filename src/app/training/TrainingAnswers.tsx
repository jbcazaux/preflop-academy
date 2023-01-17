import Button from 'components/Button'
import Move from 'domain/move'
import { useEffect, useMemo, useState } from 'react'
import Position, { heroPositionFromButtonPosition } from 'domain/position'
import styled from 'styled-components'
import Action from 'domain/action'
import ButtonPosition from 'domain/buttonPosition'
import Horizontal from 'components/layout/Horizontal'
import Vertical from 'components/layout/Vertical'

const Container = styled(Vertical)`
  flex: 0;
`

const Buttons = styled(Horizontal)`
  flex: 0;
  justify-content: space-evenly;
  flex-wrap: wrap;
`

interface IAnswerWrapper {
  correct: boolean
  answered: boolean
}
const AnswerWrapper = styled.div<IAnswerWrapper>`
  border: ${({ correct, answered }) =>
    !answered ? '2px solid transparent' : correct ? '2px solid green' : '2px solid red'};
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

const NextButton = styled(Button)`
  border: 2px solid transparent;
  margin: 20px auto;
`

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

  useEffect(() => {
    setMyAnswer(null)
  }, [buttonPosition, actions])

  const handleClick = (move: Move) => {
    setMyAnswer(move)
    setAnswer(move)
  }

  return (
    <Container>
      <Buttons>
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
      </Buttons>
      <NextButton active={!!myAnswer} disabled={!myAnswer} onClick={next} color="secondary">
        NEXT
      </NextButton>
    </Container>
  )
}

export default TrainingAnswers
