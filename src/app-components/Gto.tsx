'use client'

import { useTranslations } from 'next-intl'
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
  const t = useTranslations('solver')

  useEffect(() => {
    gto(
      hero,
      actions.map(a => a.position),
      hand
    )
      .then(result => {
        setMove(result || 'N/A')
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.error(e)
      })
  }, [hero, actions, hand])

  return (
    <ActionComponent>
      {t('you-should')} {move}
    </ActionComponent>
  )
}

export default Gto
