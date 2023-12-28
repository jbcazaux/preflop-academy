import Position from 'domain/position'
import TrainingQueryReader from 'src/app-components/training/TrainingQueryReader'

const Page = ({ params: { position } }: { children: React.ReactNode; params: { position: Position } }) => (
  <TrainingQueryReader heroPosition={position} />
)

export default Page
