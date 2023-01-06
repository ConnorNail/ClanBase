import { Div } from "atomize";

export default function BracketSimple({ align }) {
    return (
        <Div d="flex" align={align}>
            <Div bg="cbWhite" w="0.1rem" h="1rem" m={{ y: "0.5rem" }}></Div>
            <Div bg="cbWhite" w="100%" h="0.1rem" m={{ l: "auto", y: "0.5rem" }}></Div>
            <Div bg="cbWhite" w="0.1rem" h="1rem" m={{ y: "0.5rem" }}></Div>
        </Div>
    )
}