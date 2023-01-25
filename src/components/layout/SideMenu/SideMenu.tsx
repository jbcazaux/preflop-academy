import Vertical from 'components/layout/Vertical'
import styled from 'styled-components'
import { ReactNode, useState } from 'react'
import Close from 'components/layout/SideMenu/Close'
import Horizontal from 'components/layout/Horizontal'
import { Position } from 'components/layout/SideMenu/types'

const Header = styled(Horizontal)<{ position: Position }>`
  flex: 0;
  flex-direction: ${({ position }) => (position === 'left' ? 'row' : 'row-reverse')};
  align-items: center;
  justify-content: ${({ position }) => (position === 'left' ? 'flex-end' : 'flex-start')};
  margin: 10px;
`

const Title = styled(Horizontal)`
  justify-content: center;
  font-weight: bolder;
`

const Center = styled(Vertical)`
  align-items: center;
`

const Container = styled(Vertical)<{
  open: boolean
  position: Position
  openWidth: number
  pinned: boolean
  fullHeight?: boolean
}>`
  display: flex;
  position: ${({ pinned }) => (pinned ? 'inherit' : 'fixed')};
  right: ${({ position }) => (position === 'right' ? '0' : 'auto')};
  min-height: ${({ open, pinned }) => (open || pinned ? 'calc(100vh - 50px);' : '55px;')};
  height: ${({ open, pinned }) => (open || pinned ? '100%;' : '55px;')};
  overflow-y: auto;
  max-width: ${({ openWidth }) => `${openWidth}px`};
  min-width: ${({ openWidth }) => `${openWidth}px`};
  transform: ${({ open, pinned, position, openWidth }) =>
    open || pinned ? `none` : `translateX(${position === 'left' ? '-' : ''}${openWidth - 55}px)`};
  transition: transform linear 0.3s, height 0.3s 0s, min-height 0.3s 0s;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 5;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.75);
  clip-path: inset(0 -15px -15px -15px);
`

interface Props {
  title?: string | null
  position: Position
  width: number
  children: ReactNode
  pinned?: boolean
}

const SideMenu = ({ title, position, children, width, pinned = false }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Container open={open} position={position} openWidth={width} pinned={pinned} fullHeight>
      <Header position={position}>
        {title && <Title>{title}</Title>}
        <Close onClick={() => setOpen(prev => !prev)} open={open} position={position} hide={pinned} />
      </Header>
      <Center>{children}</Center>
    </Container>
  )
}

export default SideMenu
