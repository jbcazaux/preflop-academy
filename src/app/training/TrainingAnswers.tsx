import Vertical from 'components/layout/Vertical'
import Button from 'components/Button'
import Move from 'domain/move'
import React, { useMemo } from 'react'
import getVilainPosition, { getHeroPosition } from 'utils/playerPosition'
import Position from 'domain/position'
import styled from 'styled-components'

const TrainingAnswersContainer = styled(Vertical)`
  align-items: center;
`

interface Props {
  buttonPosition: number
  raisePositions: ReadonlyArray<number>
  setAnswer: (move: Move) => void
  next: () => void
}

const TrainingAnswers: React.FC<Props> = ({ buttonPosition, raisePositions, setAnswer, next }) => {
  const hero = useMemo(() => getHeroPosition(buttonPosition), [buttonPosition])
  const raises = useMemo(
    () => raisePositions.map(p => getVilainPosition(p, buttonPosition)),
    [buttonPosition, raisePositions]
  )

  return (
    <TrainingAnswersContainer>
      <Button
        active
        onClick={() => {
          setAnswer(Move.FOLD)
        }}
      >
        {Move.FOLD}
      </Button>
      <Button
        active
        disabled={hero === Position.BB || raises.length > 0}
        onClick={() => {
          setAnswer(Move.OPEN)
        }}
      >
        {Move.OPEN}
      </Button>
      <Button
        active
        disabled={raises.length !== 1}
        onClick={() => {
          setAnswer(Move.CALL)
        }}
      >
        {Move.CALL}
      </Button>
      <Button
        active
        disabled={raises.length !== 1}
        onClick={() => {
          setAnswer(Move._3BET)
        }}
      >
        {Move._3BET}
      </Button>
      <Button
        active
        disabled={raises.length !== 2}
        onClick={() => {
          setAnswer(Move.CALL3BET)
        }}
      >
        {Move.CALL3BET}
      </Button>
      <Button
        active
        disabled={raises.length !== 2}
        onClick={() => {
          setAnswer(Move._4BET)
        }}
      >
        {Move._4BET}
      </Button>
      <Next active onClick={next} color="secondary">
        NEXT
      </Next>
    </TrainingAnswersContainer>
  )
}

const Next = styled(Button)`
  margin-top: 24px;
`

export default TrainingAnswers
