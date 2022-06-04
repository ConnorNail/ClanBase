import { styled, useStyletron } from 'styletron-react'
import { Div } from "atomize";
import AppHeader from '../../organisms/commons/AppHeader'

const DefaultLayout = ({ children }) => {
    const [css] = useStyletron()
    return (
      <Div>
        <AppHeader />
  
        {/* Spacer */}
        <div className="h-12" />
        {children}
      </Div>
    )
  }
  
  export default DefaultLayout