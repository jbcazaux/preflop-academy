import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Solver from 'components/Solver'
import NotFound from 'components/NotFound'
import Training from 'components/Training'

const App: React.VFC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Solver />} />
      <Route path="/training" element={<Training />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
)

export default App
