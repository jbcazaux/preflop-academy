import styled from 'styled-components'

interface IAction {
  active: boolean
  color: string
  disabled?: boolean
  width?: number
  height?: number
  margin?: string
}

const Action = styled.div<IAction>`
  width: ${({ width }) => (width ? `${width}px` : '100px')};
  height: ${({ height }) => (height ? `${height}px` : '30px')};
  margin: ${({ margin }) => margin || '0'};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ active, theme, color }) => (active ? theme.colors[color] : theme.colors.buttons.default)};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  cursor: pointer;
`

interface Props {
  active?: boolean
  color?: string
  disabled?: boolean
  onClick: () => void
  children: string
}

const Button = ({ active = false, onClick, disabled = false, children, color, ...props }: Props) => {
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
