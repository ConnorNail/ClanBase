import { Div, Icon, Image } from "atomize";

const ScrollBox = ({ children }) => {
    return (
        <Div h="20rem" overflow="hidden auto" id="box" p={{r: "0.25rem"}}>
            {children}
        </Div>
    )
}

export default ScrollBox