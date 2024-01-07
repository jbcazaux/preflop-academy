import { useEffect, useState } from 'react'

import ActionComponent from 'components/Action'
import gto from 'data/gto-client'
import Action from 'domain/action'
import Hand from 'domain/hand'
import Position from 'domain/position'

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
    )
      .then(result => {
        setMove(result || 'N/A')
      })
      .catch(() => {
        //FIXME: add logger
      })
  }, [hero, actions, hand])

  return <ActionComponent>You should : {move}</ActionComponent>
}

export default Gto
