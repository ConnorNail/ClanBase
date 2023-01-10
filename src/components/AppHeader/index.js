import React, { useState } from 'react';
import { Div, Anchor, Button, Row, Col, Image, Icon } from "atomize";
import Link from 'next/link'
import { useRouter } from 'next/router'
import SearchBar from '../../components/SearchBar'
import MenuDropDown from '../../components/MenuDropDown'
import pageList from '../../functions/pageList'
import LoginButton from '../LoginButton';


const AppHeader = () => {

    const router = useRouter()

    return (
        <header>
            <Div bgImg="../redbar.svg" bgPos="top left" bgSize="cover" bgRepeat="no-repeat" border={{ b: "1px solid" }} borderColor="cbWhite" rounded="0 0 5px 5px">
                <Row>
                    <Col size="flex">
                        <Div>
                            <Button m="1rem" h="auto" w="6rem" hoverShadow="4" p="0rem" bg="none" onClick={() => router.push("/")}>
                                <Image src="../clanbaseLogo.svg" />
                            </Button>
                        </Div>
                    </Col>
                    <Col size="flex" d={{ xs: "none", md: "block" }}>
                        <Row p={{ t: "1.5rem" }}>
                            {pageList.map((list, index) => (
                                <Col key={index}>
                                    <Link href={list.link}>
                                        <Anchor p={{ l: "2rem", r: "2rem" }} d="flex" flexDir="column" textSize="title" textAlign="center" textColor="cbWhite" hoverTextColor="black800">
                                            {list.name}
                                        </Anchor>
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                        <Row p={{ t: "1.5rem" }}>
                            <Col>
                                <SearchBar />
                            </Col>
                        </Row>
                    </Col>
                    <Col ></Col>
                    <Col size="flex" d={{ xs: "none", md: "block" }} align="flex-end">
                        <Row transform="translate(0%, 40%)" p={{ r: "2rem" }}>
                            <LoginButton/>
                        </Row>
                    </Col>
                    <Col size="flex" d={{ xs: "block", md: "none" }} align="flex-end">
                        <Row transform="translate(0%, 40%)" p={{ r: "2rem" }}>
                            <MenuDropDown />
                        </Row>
                    </Col>
                </Row>
            </Div>
            <Div d="flex">
                <Div border={{ x: "1.5px solid", b: "1.5px solid" }} borderColor="cbWhite" rounded="0 0 10px 10px" w="100%" h="1.5rem" m={{ x: "1rem" }} d="flex" justify="center" align="flex-end">
                    <Div bg="cbWhite" w="50%" h="0.75rem" rounded="10px 10px 0 0"></Div>
                </Div>
            </Div>
        </header>
    )
}

export default AppHeader