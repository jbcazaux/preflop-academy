import { render, screen, waitFor } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

import Gto from './Gto'

import Hand from 'domain/hand'
import Position from 'domain/position'
import * as messages from 'i18n/fr.json'

jest.mock('data/gto-client', () => jest.fn().mockResolvedValue('OPEN'))
describe('Gto', () => {
  it('displays whatever gto says', async () => {
    render(
      <NextIntlClientProvider messages={messages} locale="fr">
        <Gto hero={Position.B} actions={[]} hand={Hand.newHand} />
      </NextIntlClientProvider>
    )
    await waitFor(() => {
      expect(screen.getByText('OPEN', { exact: false })).toBeInTheDocument()
    })

    screen.getByText('Conseil : OPEN')
  })
})
