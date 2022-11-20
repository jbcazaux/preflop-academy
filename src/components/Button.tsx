import styled from 'styled-components'

interface IAction {
  active: boolean
  color: string
  disabled?: boolean
  margin?: string
}

const Action = styled.div<IAction>`
  width: 100px;
  height: 30px;
  margin: 0;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ active, theme, color }) => (active ? theme.colors[color] : theme.colors.buttons.default)};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  cursor: pointer;

  @media (max-width: 420px) {
    width: 40px;
    height: 18px;
    font-size: 0.5em;
  }
  @media (min-width: 420px) and (max-width: 768px) {
    width: 50px;
    height: 20px;
    font-size: 0.6em;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    width: 80px;
    height: 25px;
    font-size: 0.8em;
  }
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
