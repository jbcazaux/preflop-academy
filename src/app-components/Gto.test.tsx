import { render, screen, waitFor } from '@testing-library/react'

import Gto from './Gto'

import Hand from 'domain/hand'
import Position from 'domain/position'

jest.mock('data/gto-client', () => jest.fn().mockResolvedValue('OPEN'))
describe('Gto', () => {
  it('displays whatever gto says', async () => {
    render(<Gto hero={Position.B} actions={[]} hand={Hand.newHand} />)
    await waitFor(() => {
      expect(screen.getByText('OPEN', { exact: false })).toBeInTheDocument()
    })

    screen.getByText('You should : OPEN')
  })
})
