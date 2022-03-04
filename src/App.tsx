import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Solver from 'app/Solver'
import NotFound from 'app/NotFound'
import Training from 'app/training/Training'
import RangesEditor from 'app/ranges/RangesEditor'
import PreflopRanges from 'app/ranges/PreflopRanges'

const App: React.VFC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Solver />} />
      <Route path="/training" element={<Training />} />
      <Route path="/ranges" element={<PreflopRanges />} />
      <Route path="/editor" element={<RangesEditor />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
)

export default App
