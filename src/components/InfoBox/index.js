import { Div, Image } from "atomize";

const InfoBox = ({ children, bg }) => {
    return (
        <Div m={{y: "1rem"}} shadow="1" hoverShadow="4" transition>
            <Div h="1.35rem" bg="cbGrey3" rounded="8px 8px 0px 0px" d="flex" align="center">
                <Image src="../clanbaseLogoNoText.svg" h="auto" w="0.9rem" m={{ l: "0.75rem", t: "0.2rem" }} alt=""/>
                <Div bg="cbBlack" h="0.7rem" w="2.25rem" rounded="xs" m={{ l: "auto", r: "0.4rem" }}></Div>
                <Div bg="cbBlack" h="0.8rem" w="0.8rem" rounded="circle" m={{ r: "1rem" }} ></Div>
            </Div>
            <Div bg="cbTransparent" h="0.25rem"></Div>
            <Div p="0.5rem" rounded="0px 0px 8px 8px" bg={bg} h="94.4%">
                {children}
            </Div>
        </Div>
    )
}

export default InfoBox