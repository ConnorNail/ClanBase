import { styled, useStyletron } from 'styletron-react'
import React, { useState } from 'react';
import { Div, Anchor, Button, Row, Col, Image, Icon } from "atomize";
import Link from 'next/link'
import { useRouter } from 'next/router'
import SearchBar from '../../components/SearchBar'

const apikey = '3a85f7e1a4444ec1865efb39ef019313';
const headers = { 'X-API-Key' : apikey }

const AppHeader = () => {
    const [css] = useStyletron()

    const router = useRouter()

    return (
        <header>
            <Div bg="brand900" shadow="5" m={{t: "-0.5rem", l: "-0.5rem", r: "-0.5rem"}}>
                <Div m={{t: "0.5rem", l: "0.5rem", r: "0.5rem"}}>
                    <Row>
                        <Col>
                            <Div m={{l: "1.5rem"}}>
                                <Button m="1rem" h="auto" w="8rem" hoverShadow="4" p="0rem" bg="none" onClick={() => router.push("/")}>
                                    <Image src="../clanbaseLogo.svg"/>
                                </Button>
                            </Div>
                        </Col>
                        <Col>
                            <Div m="3rem">
                                <SearchBar/>
                            </Div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Link href="/2084197">
                                <Anchor d="flex" flexDir="column" textSize="display1" textAlign="center" textColor="white" hoverTextColor="black800">CLAN PAGE</Anchor>
                            </Link>
                        </Col>
                        <Col>
                            <Link href="/4599535">
                                <Anchor d="flex" flexDir="column" textSize="display1" textAlign="center" textColor="white" hoverTextColor="black800">PAGE 2</Anchor>
                            </Link>
                        </Col>
                        <Col>
                            <Link href="/test-table">
                                <Anchor d="flex" flexDir="column" textSize="display1" textAlign="center" textColor="white" hoverTextColor="black800">PAGE 3</Anchor>
                            </Link>
                        </Col>
                        <Col>
                            <Link href="/clan-page-example">
                                <Anchor d="flex" flexDir="column" textSize="display1" textAlign="center" textColor="white" hoverTextColor="black800">PAGE 4</Anchor>
                            </Link>
                        </Col>
                        <Col>
                            <Link href="/clan-page-example">
                                <Anchor d="flex" flexDir="column" textSize="display1" textAlign="center" textColor="white" hoverTextColor="black800">PAGE 5</Anchor>
                            </Link>
                        </Col>
                    </Row>
                </Div>
            </Div>
        </header>
    )
  }
  
  export default AppHeader