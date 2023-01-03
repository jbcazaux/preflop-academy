import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Solver from 'app/solver/Solver'
import NotFound from 'app/NotFound'
import RangesEditor from 'app/ranges/RangesEditor'
import PreflopRanges from 'app/ranges/PreflopRanges'
import styled, { StyleSheetManager, ThemeProvider } from 'styled-components'
import style from 'components/Theme/style'
import { QueryClient, QueryClientProvider } from 'react-query'
import Training from 'app/training'
import Home from 'app/Home'
import Vertical from 'components/layout/Vertical'
import Horizontal from 'components/layout/Horizontal'
import Menu from 'app/menu/Menu'

const queryClient = new QueryClient()

const StyledApp = styled(Horizontal)`
  * {
    box-sizing: border-box;
  }
`

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  height: 50px;
  color: black;
  border-bottom: 1px solid black;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 5px 5px rgb(0 0 0 / 20%);
  clip-path: inset(-15px);
`

const App = () => (
  <StyleSheetManager disableVendorPrefixes>
    <ThemeProvider theme={style}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <StyledApp>
            <Menu />
            <Vertical>
              <Header>GTO Poker</Header>
              <section>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/solver" element={<Solver />} />
                  <Route path="/training/*" element={<Training />} />
                  <Route path="/ranges" element={<PreflopRanges />} />
                  <Route path="/editor" element={<RangesEditor />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </section>
            </Vertical>
          </StyledApp>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  </StyleSheetManager>
)

export default App
