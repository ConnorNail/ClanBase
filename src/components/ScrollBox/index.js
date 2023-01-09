import { Div, Icon, Image } from "atomize";

const ScrollBox = ({ children, h }) => {
    return (
        <Div h={h} overflow="hidden auto" id="box" p={{r: "0.25rem"}}>
            {children}
        </Div>
    )
}

export default ScrollBox