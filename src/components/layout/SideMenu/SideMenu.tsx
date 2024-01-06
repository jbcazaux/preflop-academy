'use client'

import { ReactNode, useState } from 'react'
import cn from 'classnames'

import Horizontal from 'components/layout/Horizontal'
import Close from 'components/layout/SideMenu/Close'
import Vertical from 'components/layout/Vertical'

import style from './SideMenu.module.scss'

export type SideMenuPosition = 'left' | 'right'

interface Props {
  title?: string | null
  position: SideMenuPosition
  children: ReactNode
  className?: string
}

const SideMenu = ({ title, position, children, className }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Vertical
      className={cn(className, style.container, {
        [style.open]: open,
        [style['position-left']]: position === 'left',
        [style['position-right']]: position === 'right',
      })}
    >
      <Horizontal
        className={cn(style.header, {
          [style['position-left']]: position === 'left',
          [style['position-right']]: position === 'right',
        })}
      >
        {title && <Horizontal className={style.title}>{title}</Horizontal>}
        <Close onClick={() => setOpen(prev => !prev)} open={open} position={position} />
      </Horizontal>
      <Vertical className={style.center}>{children}</Vertical>
    </Vertical>
  )
}

export default SideMenu
