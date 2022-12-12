import { Div } from "atomize";

const InfoBox = ({ children }) => {
    return (
        <Div rounded="24px" bg="cbRedTransparent" shadow="5" border="1px solid" borderColor="cbWhite" p="0.5rem">
            {children}
        </Div>
    )
  }
  
  export default InfoBox