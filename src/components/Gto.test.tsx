import {render} from '@testing-library/react'
import Gto from 'components/Gto'
import Hand from 'domain/hand'
import 'jest-styled-components'

jest.mock('data/gto', () => () => 'FOO')
describe('Gto', () => {
    it('displays whatever gto says', () => {
        const { container } = render(<Gto buttonPostion={0} raisePositions={[]} hand={Hand.newHand}  />)

        expect(container).toMatchSnapshot()
    })
})
