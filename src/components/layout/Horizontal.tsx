import cn from 'classnames'
import React from 'react'

import styles from './Horizontal.module.scss'

interface Props {
  children: React.ReactNode
  className?: string
}
const Horizontal = ({ children, className }: Props) => (
  <div className={cn(styles.horizontal, className)}>{children}</div>
)
export default Horizontal
