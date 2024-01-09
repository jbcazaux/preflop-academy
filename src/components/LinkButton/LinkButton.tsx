import cn from 'classnames'

import style from './LinkButton.module.scss'

import { Link } from 'i18n/navigation'

interface Props {
  active?: boolean
  color?: string
  disabled?: boolean
  href: string
  children: string
  className?: string
}

const LinkButton = ({ active = false, href, disabled = false, children, className, ...props }: Props) =>
  disabled ? (
    <div className={cn(className, style.action, style.disabled)} {...props}>
      {children}
    </div>
  ) : (
    <Link
      className={cn(className, style.action, {
        [style.active]: active,
      })}
      {...props}
      href={href}
    >
      {children}
    </Link>
  )

export default LinkButton
