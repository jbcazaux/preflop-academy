import style from './Close.module.scss'
import { SideMenuPosition } from 'components/layout/SideMenu/SideMenu'
import cn from 'classnames'

interface Props {
  onClick: () => void
  open: boolean
  position: SideMenuPosition
}

const Close = ({ onClick, open, position }: Props) => (
  <div
    className={cn(style.container, {
      [style['position-left']]: position === 'left',
      [style['position-right']]: position === 'right',
    })}
    onClick={onClick}
  >
    <div
      className={cn(style.arrow, {
        [style.open]: open,
        [style['position-left']]: position === 'left',
        [style['position-right']]: position === 'right',
      })}
    >
      {position === 'left' ? '>' : '<'}
    </div>
  </div>
)

export default Close
