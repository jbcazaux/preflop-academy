'use client'

import React, { PropsWithChildren, useState } from 'react'

import style from './Tabs.module.scss'

import Tab from 'components/Tabs/Tab'
import TabTitle from 'components/Tabs/TabTitle'

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
          if (child.type !== Tab) return null
          const onclick = setCurrentTabId.bind(null, index)
          return (
            <TabTitle selected={currentTabId === index} onClick={onclick}>
              {child.props.title}
            </TabTitle>
          )
        })}
      </div>
      {React.Children.map(children, (child, index) => {
        if (index !== currentTabId) return null
        if (child.type !== Tab) return null
        return child.props.children
      })}
    </div>
  )
}

export default Tabs
