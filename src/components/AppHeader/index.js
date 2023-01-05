import { styled, useStyletron } from 'styletron-react'
import React, { useState } from 'react';
import { Div, Anchor, Button, Row, Col, Image, Icon } from "atomize";
import Link from 'next/link'
import { useRouter } from 'next/router'
import SearchBar from '../../components/SearchBar'
import MenuDropDown from '../../components/MenuDropDown'
import pageList from '../pageList'

const AppHeader = () => {
    const [css] = useStyletron()

    const router = useRouter()

    return (
        <header>
            <Div bgImg="../redbar.svg" bgPos="top left" bgSize="cover" bgRepeat="no-repeat">
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
                    <Col size="flex" d={{ xs: "block", md: "none" }} align="flex-end">
                        <Row transform="translate(0%, 40%)" p={{ r: "2rem" }}>
                            <MenuDropDown />
                        </Row>
                    </Col>
                </Row>

            </Div>
        </header>
    )
}

export default AppHeader