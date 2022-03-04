import styled from 'styled-components'
import React from 'react'

interface IActive {
  active: boolean
  activeBgColor?: string
  disabled?: boolean
}

const Action = styled.div<IActive>`
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ active, activeBgColor }) => (active ? activeBgColor || '#2DDAEE' : 'white')};
  margin: 4px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  cursor: pointer;
`

interface Props {
  disabled?: boolean
  activeBgColor?: string
  active?: boolean
  onClick: () => void
}

const Button: React.FC<Props> = ({ active = false, onClick, disabled = false, children, activeBgColor }) => {
  const handleClick = () => {
    !disabled && onClick()
  }

  return (
    <Action active={!disabled && active} disabled={disabled} onClick={handleClick} activeBgColor={activeBgColor}>
      {children}
    </Action>
  )
}

export default Button
