import classNames from 'classnames'

import style from './TabTitle.module.scss'

interface Props {
  selected: boolean
  onClick: () => void
  children: string
}
const TabTitle = ({ selected, children, onClick }: Props) => (
  <div
    className={classNames(style.title, {
      [style.selected]: selected,
    })}
    onClick={onClick}
    role="tab"
  >
    {children}
  </div>
)
export default TabTitle
