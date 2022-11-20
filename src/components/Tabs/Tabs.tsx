import React, { PropsWithChildren, useState } from 'react'
import styled from 'styled-components'
import TabTitle from 'components/Tabs/TabTitle'
import Tab from 'components/Tabs/Tab'

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const TabList = styled.div`
  display: flex;
  flex-direction: row;
`

interface TabProps extends PropsWithChildren<React.ReactElement> {
  title: string
}

interface Props {
  children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[]
}

const Tabs = ({ children }: Props) => {
  const [currentTabId, setCurrentTabId] = useState<number>(0)

  return (
    <TabsContainer role="tabs">
      <TabList role="tablist">
        {React.Children.map(children, (child, index) => {
          if ((child as React.ReactElement<TabProps>).type !== Tab) return null
          const onclick = setCurrentTabId.bind(null, index)
          return (
            <TabTitle selected={currentTabId === index} onClick={onclick}>
              {(child as React.ReactElement<TabProps>).props.title}
            </TabTitle>
          )
        })}
      </TabList>
      {React.Children.map(children, (child, index) => {
        if (index !== currentTabId) return null
        if ((child as React.ReactElement<TabProps>).type !== Tab) return null
        return (child as React.ReactElement<TabProps>).props.children
      })}
    </TabsContainer>
  )
}

export default Tabs
