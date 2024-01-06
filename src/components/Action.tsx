import { ReactNode } from 'react'

import style from './Action.module.scss'

const Action = ({ children }: { children: ReactNode }) => <div className={style.action}>{children}</div>

export default Action
