import App from './App'
import { createGlobalStyle } from 'styled-components'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Calibri, "Helvetica Neue", Arial, sans-serif;
  }
`

const container = document.getElementById('root')
const root = createRoot(container as Element)
root.render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>
)
