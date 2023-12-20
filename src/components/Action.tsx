import styled from 'styled-components'

const Action = styled.div`
  display: flex;
  margin: 10px 0;
  font-weight: bold;
  font-size: 2em;
  @media (${({ theme }) => theme.breakpoints.max.desktop}) {
    font-size: 1em;
  }
`

export default Action
