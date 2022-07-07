import { styled, useStyletron } from 'styletron-react'
import { Div } from "atomize";

const InfoBox = ({ children }) => {
    const [css] = useStyletron()
    return (
        <Div rounded="24px" bg="rgba(231, 47, 29, 0.75)" shadow="5" border="1px solid" borderColor="#F1E9E6" m={{t: "1rem", b: "1rem"}}>
            {children}
        </Div>
    )
  }
  
  export default InfoBox