import styled from 'styled-components'
import Vertical from 'components/layout/Vertical'
import Horizontal from 'components/layout/Horizontal'

const Vertical0 = styled.div`
  display: flex;
  flex-direction: column;
`

const CenterVertical = styled(Vertical)`
  justify-content: center;
`

const WLResult = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  height: 30px;
  align-items: center;
  margin: 1px;
`
const WLResultWin = styled(WLResult)`
  background: aquamarine;
`
const WLResultLose = styled(WLResult)`
  background: lightcoral;
`
const WLResultTie = styled(WLResult)`
  background: ${({ theme }) => theme.colors.secondary};
  font-size: 14px;
  height: 20px;
`
const WLResultTotal = styled(WLResult)`
  background: ${({ theme }) => theme.colors.secondary};
  font-size: 10px;
  height: 16px;
`

const Rate: React.FC<{ rate: number }> = ({ rate }) => <>{rate.toFixed(2)} %</>
const numberWithSeparator = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

interface Props {
  title: string
  winRate: number
  loseRate: number
  tieRate: number
  total: number
}

const WLResults = ({ title, winRate, loseRate, tieRate, total }: Props) => (
  <CenterVertical>
    <Vertical0>
      <Horizontal>{title}</Horizontal>
      <Horizontal>
        <WLResultWin>
          WIN: <Rate rate={winRate} />{' '}
        </WLResultWin>
        <WLResultLose>
          LOSE: <Rate rate={loseRate} />
        </WLResultLose>
      </Horizontal>
      <Horizontal>
        <WLResultTie>
          DRAW: <Rate rate={tieRate} />
        </WLResultTie>
      </Horizontal>
      <Horizontal>
        <WLResultTotal>TOTAL: {numberWithSeparator(total)}</WLResultTotal>
      </Horizontal>
    </Vertical0>
  </CenterVertical>
)

export default WLResults
