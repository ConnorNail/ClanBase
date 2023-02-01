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
        {/* <Div bgImg="../lightfallBackground.jpeg" bgPos="top" bgSize="auto" bgRepeat="no-repeat" m={{ x: "-0.5rem", y: "-2.5rem" }}>
          <Div bgImg="../destinyBackgroundOverlay.png" bgPos="top" bgSize="auto" bgRepeat="no-repeat"> */}

            {children}

          {/* </Div>
        </Div> */}
        <AppFooter />
      </Div>
    </ThemeProvider>
  )
}

export default DefaultLayout