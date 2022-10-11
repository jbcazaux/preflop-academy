import React from 'react'
import App from './App'
import {createGlobalStyle} from 'styled-components'
import {createRoot} from 'react-dom/client'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Calibri, "Helvetica Neue", Arial, sans-serif;
  }
`

const container = document.getElementById('root')
const root = createRoot(container as Element)
root.render(
    <React.StrictMode>
        <GlobalStyle/>
        <App/>
    </React.StrictMode>
)
