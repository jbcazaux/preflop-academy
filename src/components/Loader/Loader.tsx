import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

interface Props {
  size?: number
}

const Loader = styled.div<Props>`
  border: ${({ theme, size = 20 }) => `${size / 4}px solid ${theme.colors.loader.background}`};
  border-top: ${({ theme, size = 20 }) => `${size / 4}px solid ${theme.colors.loader.color}`};
  border-radius: 50%;
  width: ${({ size = 20 }) => size + 'px'};
  height: ${({ size = 20 }) => size + 'px'};
  animation: ${spin} 1s linear infinite;
`

export default Loader
