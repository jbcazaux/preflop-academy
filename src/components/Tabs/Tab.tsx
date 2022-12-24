import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren<unknown> {
  title: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Tab = (_: Props) => null

export default Tab
