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

const Container = styled(Vertical)<{ open: boolean; position: 'left' | 'right'; openWidth: number }>`
  display: flex;
  position: fixed;
  top: 0;
  left: ${({ position }) => (position === 'left' ? '0' : 'auto')};
  right: ${({ position }) => (position === 'right' ? '0' : 'auto')};
  height: ${({ open }) => (open ? '100vh' : '55px')};
  overflow-y: auto;
  width: ${({ openWidth }) => `${openWidth}px`};
  transform: ${({ open, position, openWidth }) =>
    open ? `none` : `translateX(${position === 'left' ? '-' : ''}${openWidth - 55}px)`};
  transition: transform linear 0.3s ${({ open }) => (open ? '' : ', height .3s .0s')};
  background-color: white;
  z-index: 10;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.75);
  clip-path: inset(-15px);
`

interface Props {
  title?: string
  position: Position
  width: number
  children: ReactNode
}

const SideMenu = ({ title, position, children, width }: Props) => {
  const [open, setOpen] = useState<boolean>(true)
  return (
    <Container open={open} position={position} openWidth={width}>
      <Header position={position}>
        {title && <Title>{title}</Title>}
        <Close onClick={() => setOpen(prev => !prev)} open={open} position={position} />
      </Header>
      <Center>{children}</Center>
    </Container>
  )
}

export default SideMenu
