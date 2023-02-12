import { styled, useStyletron } from 'styletron-react'
import { ThemeProvider, Div } from "atomize";
import AppHeader from '../../components/AppHeader'
import AppFooter from '../../components/AppFooter'
import theme from '../../theme'

const DefaultLayout = ({ children }) => {
  const [css] = useStyletron()

  return (
    <ThemeProvider theme={theme}>
      <Div className="font-face-gm" m="-0.5rem" overflow="hidden">
        <AppHeader />
        <Div minH="100vh">
          {children}
        </Div>
        <AppFooter />
      </Div>
    </ThemeProvider>
  )
}

export default DefaultLayout