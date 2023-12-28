import { render } from '@testing-library/react'
import Hand from 'domain/hand'
import 'jest-styled-components'
import Position from 'domain/position'
import Move from 'domain/move'
import Gto from './Gto'

jest.mock('data/gto', () => () => Move.OPEN)
describe('Gto', () => {
  it('displays whatever gto says', () => {
    const { container } = render(<Gto hero={Position.B} actions={[]} hand={Hand.newHand} />)

    expect(container).toMatchSnapshot()
  })
})
