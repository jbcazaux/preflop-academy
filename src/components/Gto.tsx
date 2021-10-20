import Hand from 'domain/hand'
import React from 'react'
import gto from '../data/gto'
import styled from 'styled-components'

const Advice = styled.div`
  display: flex;
  margin: 10px auto;
  font-weight: bold;
  font-size: 2em;
`

interface Props {
  buttonPostion: number
  raisePositions: ReadonlyArray<number>
  hand: Hand
}

const Gto: React.FC<Props> = ({ buttonPostion, raisePositions, hand }) => {
  const advice = gto(buttonPostion, raisePositions, hand)
  return <Advice>{advice}</Advice>
}

export default Gto
