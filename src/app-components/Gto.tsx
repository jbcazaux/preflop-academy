import gto from 'data/gto'
import Action from 'domain/action'
import Hand from 'domain/hand'
import Position from 'domain/position'

import ActionComponent from 'components/Action'

interface Props {
  hero: Position
  actions: ReadonlyArray<Action>
  hand: Hand
}

const Gto = ({ hero, actions, hand }: Props) => {
  const move = gto(
    hero,
    actions.map(a => a.position),
    hand
  )
  return <ActionComponent>You should : {move || 'N/A'}</ActionComponent>
}

export default Gto
