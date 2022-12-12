import { styled, useStyletron } from 'styletron-react'
import { ThemeProvider, Div } from "atomize";
import AppHeader from '../../components/AppHeader'

const DefaultLayout = ({ children }) => {
    const [css] = useStyletron()
    return (
        <Div className="font-face-gm" m={{t: "-0.5rem", l: "-0.5rem", r: "-0.5rem"}} overflow="hidden">
          <AppHeader />
          {children}
        </Div>
    )
  }
  
  export default DefaultLayout