import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Solver from 'app/solver/Solver'
import NotFound from 'app/NotFound'
import RangesEditor from 'app/ranges/RangesEditor'
import PreflopRanges from 'app/ranges/PreflopRanges'
import { ThemeProvider } from 'styled-components'
import style from 'components/Theme/style'
import { QueryClient, QueryClientProvider } from 'react-query'
import TrainingSelector from 'app/training/TrainingSelector'

const queryClient = new QueryClient()

const App = () => (
  <ThemeProvider theme={style}>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Solver />} />
          <Route path="/training/*" element={<TrainingSelector />} />
          <Route path="/ranges" element={<PreflopRanges />} />
          <Route path="/editor" element={<RangesEditor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  </ThemeProvider>
)

export default App
