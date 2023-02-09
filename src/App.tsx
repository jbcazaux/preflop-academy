import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Solver from 'app/solver/Solver'
import NotFound from 'app/NotFound'
import RangesEditor from 'app/ranges/editor/RangesEditor'
import PreflopRanges from 'app/ranges/PreflopRanges'
import styled, { StyleSheetManager, ThemeProvider } from 'styled-components'
import style from 'components/Theme/style'
import { QueryClient, QueryClientProvider } from 'react-query'
import Training from 'app/training'
import Home from 'app/Home'
import Vertical from 'components/layout/Vertical'
import Horizontal from 'components/layout/Horizontal'
import Menu from 'app/menu/Menu'
import 'i18n/i18n'
import Header from 'components/header/Header'

const queryClient = new QueryClient()

const StyledApp = styled(Horizontal)`
  color: ${({ theme }) => theme.colors.black};
  * {
    box-sizing: border-box;
  }
`
const Content = styled(Vertical)`
  background-color: ${({ theme }) => theme.colors.background};
`

const App = () => (
  <StyleSheetManager disableVendorPrefixes>
    <ThemeProvider theme={style}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <StyledApp>
            <Menu />
            <Content>
              <Header />
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
            </Content>
          </StyledApp>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  </StyleSheetManager>
)

export default App
