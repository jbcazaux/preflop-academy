import styled from 'styled-components'
import React from 'react'

interface IAction {
  active: boolean
  color: string
  disabled?: boolean
}

const Action = styled.div<IAction>`
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ active, theme, color }) => (active ? theme.colors[color] : theme.colors.buttons.default)};
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
  cursor: pointer;
`

interface Props {
  active?: boolean
  color?: string
  disabled?: boolean
  onClick: () => void
}

const Button: React.FC<Props> = ({ active = false, onClick, disabled = false, children, color, ...props }) => {
  const handleClick = () => {
    !disabled && onClick()
  }

  return (
    <Action
      {...props}
      active={!disabled && active}
      disabled={disabled}
      onClick={handleClick}
      color={color || 'primary'}
    >
      {children}
    </Action>
  )
}

export default Button
