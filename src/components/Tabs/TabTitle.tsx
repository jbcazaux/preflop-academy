import React from 'react'
import styled from 'styled-components'

interface ITab {
  selected: boolean
}
const Tab = styled.div<ITab>`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  margin: 0;
  padding: 5px;
  border: solid 1px #2e404f;
  border-radius: 5px 5px 0 0;
  cursor: pointer;
  color: ${({ selected }) => (selected ? 'white' : '#2e404f')};
  background-color: ${({ selected }) => (selected ? '#2e404f' : 'white')};
`

interface TabTitleProps {
  selected: boolean
  onClick: () => void
}
const TabTitle: React.FC<TabTitleProps> = ({ selected, children, onClick }) => (
  <Tab onClick={onClick} selected={selected} role="tab">
    {children}
  </Tab>
)
export default TabTitle
