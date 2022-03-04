import { render } from '@testing-library/react'
import Gto from 'app/Gto'
import Hand from 'domain/hand'
import 'jest-styled-components'
import Position from 'domain/position'

jest.mock('data/gto', () => () => 'FOO')
describe('Gto', () => {
  it('displays whatever gto says', () => {
    const { container } = render(<Gto hero={Position.B} raisePositions={[]} hand={Hand.newHand} />)

    expect(container).toMatchSnapshot()
  })
})
