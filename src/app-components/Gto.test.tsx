import { render } from '@testing-library/react'
import Hand from 'domain/hand'
import Move from 'domain/move'
import Position from 'domain/position'

import 'jest-styled-components'

import Gto from './Gto'

jest.mock('data/gto', () => () => Move.OPEN)
describe('Gto', () => {
  it('displays whatever gto says', () => {
    const { container } = render(<Gto hero={Position.B} actions={[]} hand={Hand.newHand} />)

    expect(container).toMatchSnapshot()
  })
})
