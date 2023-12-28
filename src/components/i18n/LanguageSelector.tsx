import Horizontal from 'components/layout/Horizontal'
import FlagFr from 'assets/icons/FlagFr'
import FlagUs from 'assets/icons/FlagUs'

import Link from 'next/link'

interface Props {
  className?: string
}
const LanguageSelector = ({ className = '' }: Props) => (
  <Horizontal className={className}>
    <Link href="/" locale="fr">
      <FlagFr />
    </Link>
    <Link href="/" locale="en">
      <FlagUs />
    </Link>
  </Horizontal>
)

export default LanguageSelector
