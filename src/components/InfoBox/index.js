import { Div } from "atomize";

const InfoBox = ({ children }) => {
    return (
        <Div rounded="24px" bg="cbRedTransparent" shadow="1" hoverShadow="4" border="1px solid" borderColor="cbWhite" p="0.5rem">
            {children}
        </Div>
    )
  }
  
  export default InfoBox