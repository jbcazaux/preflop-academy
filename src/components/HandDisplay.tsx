import Card2 from 'components/Card2'
import Hand from 'domain/hand'
import styled from 'styled-components'

const HandDisplayContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 50px;
  margin: 10px 0;
`

interface Props {
  hand: Hand
}

const HandDisplay = ({ hand }: Props) => (
  <HandDisplayContainer>
    {hand.card1 && <Card2 card={hand.card1} />}
    {hand.card2 && <Card2 card={hand.card2} />}
  </HandDisplayContainer>
)

export default HandDisplay
