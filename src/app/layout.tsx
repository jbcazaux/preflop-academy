import { ReactNode } from 'react'

import 'style/global.scss'

type Props = {
  children: ReactNode
}

const RootLayout = ({ children }: Props) => children

export default RootLayout
