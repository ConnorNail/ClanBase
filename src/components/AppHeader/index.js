import React, { useState } from 'react';
import { Div, Anchor, Button, Row, Col, Image, Icon, Text } from "atomize";
import Link from 'next/link'
import { useRouter } from 'next/router'
import SearchBar from '../../components/SearchBar'
import MenuDropDown from '../../components/MenuDropDown'
import pageList from '../../functions/usePageList'
import LoginButton from '../LoginButton';


const AppHeader = () => {
    const router = useRouter()
    const pages = pageList()

    return (
        <header>
            <nav>
                <Div bg="cbRed" border={{ b: "1px solid" }} borderColor="cbWhite">
                    <Row>
                        <Col size="auto" d={{ xs: "flex", xl: "none" }} align="center">
                            <Div m={{ x: "0.5rem" }}>
                                <MenuDropDown />
                            </Div>
                        </Col>
                        <Col d={{ xs: "none", xl: "block" }}>
                            <Link href="/" passHref legacyBehavior>
                                <Anchor>
                                    <Image src="../clanbaseLogo.svg" alt="ClanBase Logo" h="auto" w="4rem" m="1rem" />
                                </Anchor>
                            </Link>
                        </Col>
                        <Col size="auto" d={{ xs: "none", xl: "flex" }} align="center">
                            <Div>
                                <Row d="flex" m="0.5rem">
                                    {pages.map((list, index) => (
                                        <Div key={index}>
                                            <Link href={list.link} passHref legacyBehavior>
                                                <Anchor>
                                                    <Text p={{ x: "1.5rem" }} textSize="subheader" textAlign="center" textColor="cbWhite" hoverTextColor="cbBlue">
                                                        {list.name}
                                                    </Text>
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
                            </Div>
                        </Col>
                        <Col d="flex" justify="flex-end">
                            <Div m="0.5rem">
                                <LoginButton />
                            </Div>
                        </Col>
                    </Row>
                    <Row d={{ xs: "block", xl: "none" }} m="0.5rem">
                        <Col>
                            <SearchBar />
                        </Col>
                    </Row>
                </Div>
                <Div d="flex">
                    <Div border={{ x: "1.5px solid", t: "1.5px solid" }} borderColor="cbWhite" rounded="10px 10px 0 0" w="100%" h="1.5rem" m={{ t: "1rem", x: "1rem" }} d="flex" justify="center" align="flex-start"/>
                </Div>
            </nav>
        </header>
    )
}

export default AppHeader