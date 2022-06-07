import { styled, useStyletron } from 'styletron-react'
import { Div } from "atomize";

const InfoBox = ({ children }) => {
    const [css] = useStyletron()
    return (
        <Div rounded="md" shadow="5" border="3px solid" borderColor="brand900" m={{t: "1rem", b: "1rem"}}>
            {children}
        </Div>
    )
  }
  
  export default InfoBox