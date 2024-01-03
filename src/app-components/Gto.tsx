import { useEffect, useState } from 'react'
import gto from 'data/gto-client'
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
  const [move, setMove] = useState<string>('')

  useEffect(() => {
    gto(
      hero,
      actions.map(a => a.position),
      hand
    ).then(result => {
      setMove(result || 'N/A')
    })
  }, [hero, actions, hand])

  return <ActionComponent>You should : {move}</ActionComponent>
}

export default Gto
