import 'server-only'

import Training from 'app-components/training/Training'
import TrainingMenu from 'app-components/training/trainingMenu/TrainingMenu'
import Move from 'domain/move'
import Position from 'domain/position'

import Horizontal from 'components/layout/Horizontal'

const Page = ({ params: { position, move } }: { params: { position: Position; move: Move } }) => (
  <Horizontal>
    <TrainingMenu heroPosition={position} moveType={move} />
    <Training heroPosition={position} move={move} />
  </Horizontal>
)

export default Page
