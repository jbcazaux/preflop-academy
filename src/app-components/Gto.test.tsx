import { render, screen, waitFor } from '@testing-library/react'
import Hand from 'domain/hand'
import Move from 'domain/move'
import Position from 'domain/position'

import 'jest-styled-components'

import Gto from './Gto'

jest.mock('data/gto-client', () => jest.fn().mockResolvedValue(Move.OPEN))
describe('Gto', () => {
  it('displays whatever gto says', async () => {
    render(<Gto hero={Position.B} actions={[]} hand={Hand.newHand} />)
    await waitFor(() => {
      expect(screen.getByText('OPEN', { exact: false })).toBeInTheDocument()
    })

    screen.getByText('You should : OPEN')
  })
})
