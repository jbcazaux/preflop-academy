import style from './Button.module.scss'
import cn from 'classnames'

interface Props {
  active?: boolean
  color?: string
  disabled?: boolean
  onClick: () => void
  children: string
  className?: string
}

const Button = ({ active = false, onClick, disabled = false, children, className, ...props }: Props) => {
  const handleClick = () => {
    !disabled && onClick()
  }

  return (
    <div
      className={cn(className, style.action, {
        [style.active]: !disabled && active,
        [style.disabled]: disabled,
      })}
      {...props}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}

export default Button
