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
            <Div bg="cbRed" border={{ b: "1px solid" }} borderColor="cbWhite">
                <Row>
                    <Col size="auto">
                        <Div>
                            <Button m="1rem" h="auto" w="4rem" hoverShadow="4" p="0rem" bg="none" onClick={() => router.push("/")}>
                                <Image src="../clanbaseLogo.svg" alt="ClanBase Logo"/>
                            </Button>
                        </Div>
                    </Col>
                    <Col size="auto" d={{ xs: "none", md: "block" }}>
                        <Row>
                            {pageList.map((list, index) => (
                                <Div key={index}>
                                    <Link href={list.link}>
                                        <Anchor p={{ x: "2rem" }} textSize="title" textAlign="center" textColor="cbWhite" hoverTextColor="cbBlue">
                                            {list.name}
                                        </Anchor>
                                    </Link>
                                </Div>
                            ))}
                        </Row>
                        <Row>
                            <Col>
                                <SearchBar />
                            </Col>
                        </Row>
                    </Col>
                    <Col d="flex" justify="flex-end">
                        <Div m="1rem">
                            <LoginButton/>
                        </Div>
                    </Col>
                    <Col size="flex" d={{ xs: "block", md: "none" }} align="flex-end">
                        <Row transform="translate(0%, 40%)" p={{ r: "2rem" }}>
                            <MenuDropDown />
                        </Row>
                    </Col>
                </Row>
            </Div>
            <Div d="flex">
                <Div border={{ x: "1.5px solid", t: "1.5px solid" }} borderColor="cbWhite" rounded="10px 10px 0 0" w="100%" h="1.5rem" m={{ t: "1rem", x: "1rem" }} d="flex" justify="center" align="flex-start">
                    <Div bg="cbWhite" w="50%" h="0.75rem" rounded="0 0 10px 10px"></Div>
                </Div>
            </Div>
        </header>
    )
}

export default AppHeader