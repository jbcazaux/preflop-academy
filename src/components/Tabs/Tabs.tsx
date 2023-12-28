'use client'

import React, { PropsWithChildren, useState } from 'react'
import style from './Tabs.module.scss'
import TabTitle from 'components/Tabs/TabTitle'
import Tab from 'components/Tabs/Tab'

interface TabProps extends PropsWithChildren<React.ReactElement> {
  title: string
}

interface Props {
  children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[]
}

const Tabs = ({ children }: Props) => {
  const [currentTabId, setCurrentTabId] = useState<number>(0)

  return (
    <div className={style.container} role="tabs">
      <div className={style.tablist} role="tablist">
        {React.Children.map(children, (child, index) => {
          if ((child as React.ReactElement<TabProps>).type !== Tab) return null
          const onclick = setCurrentTabId.bind(null, index)
          return (
            <TabTitle selected={currentTabId === index} onClick={onclick}>
              {(child as React.ReactElement<TabProps>).props.title}
            </TabTitle>
          )
        })}
      </div>
      {React.Children.map(children, (child, index) => {
        if (index !== currentTabId) return null
        if ((child as React.ReactElement<TabProps>).type !== Tab) return null
        return (child as React.ReactElement<TabProps>).props.children
      })}
    </div>
  )
}

export default Tabs
