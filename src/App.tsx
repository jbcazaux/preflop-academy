import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Solver from 'app/solver/Solver'
import NotFound from 'app/NotFound'
import Training from 'app/training/Training'
import RangesEditor from 'app/ranges/RangesEditor'
import PreflopRanges from 'app/ranges/PreflopRanges'
import { ThemeProvider } from 'styled-components'
import style from 'components/Theme/style'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const App: React.VFC = () => (
  <ThemeProvider theme={style}>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Solver />} />
          <Route path="/training" element={<Training />} />
          <Route path="/ranges" element={<PreflopRanges />} />
          <Route path="/editor" element={<RangesEditor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  </ThemeProvider>
)

export default App
