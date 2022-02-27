import styled from 'styled-components'
import React from 'react'

interface IActive {
  active: boolean
  disabled?: boolean
}

const Action = styled.div`
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props: IActive) => (props.active ? '#2DDAEE' : 'white')};
  margin: 4px;
  opacity: ${(props: IActive) => (props.disabled ? 0.5 : 1)};
  cursor: pointer;
`

interface Props {
  disabled?: boolean
  active: boolean
  onClick: () => void
}

const Button: React.FC<Props> = ({ active, onClick, disabled = false, children }) => {
  const handleClick = () => {
    !disabled && onClick()
  }

  return (
    <Action active={!disabled && active} disabled={disabled} onClick={handleClick}>
      {children}
    </Action>
  )
}

export default Button
