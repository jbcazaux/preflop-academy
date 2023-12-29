import Position from 'domain/position'
import TrainingQueryReader from 'src/app-components/training/TrainingQueryReader'

const Page = ({ params: { position } }: { params: { position: Position } }) => (
  <TrainingQueryReader heroPosition={position} />
)

export default Page
