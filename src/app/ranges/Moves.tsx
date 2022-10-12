import Move from 'domain/move'
import Button from 'components/Button'

interface Props {
  setHeroMove: (m: Move) => void
  heroMove: Move
}
const Moves = ({ setHeroMove, heroMove }: Props) => (
  <>
    {[Move.OPEN, Move.CALL, Move._3BET, Move.CALL3BET, Move._4BET].map(move => (
      <Button key={move} onClick={() => setHeroMove(move)} active={heroMove === move}>
        {move}
      </Button>
    ))}
  </>
)

export default Moves
