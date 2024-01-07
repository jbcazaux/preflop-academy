import cn from 'classnames'
import React from 'react'

import styles from './Vertical.module.scss'

interface Props {
  children: React.ReactNode
  className?: string
}
const Vertical = React.forwardRef<HTMLDivElement, Props>(({ className, children }, ref) => (
  <div ref={ref} className={cn(styles.vertical, className)}>
    {children}
  </div>
))

Vertical.displayName = 'Vertical'
export default Vertical
