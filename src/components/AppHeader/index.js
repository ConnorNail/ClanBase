import { styled, useStyletron } from 'styletron-react'
import React, { useState } from 'react';
import { Div, Anchor, Text, Row, Col, Input, Icon } from "atomize";
import Link from 'next/link'
import { useRouter } from 'next/router'
import SearchBar from '../../components/SearchBar'

const apikey = '3a85f7e1a4444ec1865efb39ef019313';
const headers = { 'X-API-Key' : apikey }

const AppHeader = () => {
    const [css] = useStyletron()

    return (
        <header>
            <Div bg="brand900" rounded="xl" shadow="5" m={{t: "-1rem", l: "-1rem", r: "-1rem"}}>
                <Div m={{l: "1rem", r: "1rem"}}>
                    <Row>
                        <Col>
                            <Div>
                                <Link href="/">
                                    <Anchor tag="h1" textSize="display3" textColor="white" hoverTextColor="black800" m="2rem">CLANBASE</Anchor>
                                </Link>
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
                                <Anchor textSize="display1" textAlign="center" textColor="white" hoverTextColor="black800" m="1rem">CLAN PAGE</Anchor>
                            </Link>
                        </Col>
                        <Col>
                            <Link href="/4599535">
                                <Anchor textSize="display1" textAlign="center" textColor="white" hoverTextColor="black800" m="1rem">PAGE 2</Anchor>
                            </Link>
                        </Col>
                        <Col>
                            <Link href="/clan-page-example">
                                <Anchor textSize="display1" textAlign="center" textColor="white" hoverTextColor="black800" m="1rem">PAGE 3</Anchor>
                            </Link>
                        </Col>
                        <Col>
                            <Link href="/clan-page-example">
                                <Anchor textSize="display1" textAlign="center" textColor="white" hoverTextColor="black800" m="1rem">PAGE 4</Anchor>
                            </Link>
                        </Col>
                        <Col>
                            <Link href="/clan-page-example">
                                <Anchor textSize="display1" textAlign="center" textColor="white" hoverTextColor="black800" m="1rem">PAGE 5</Anchor>
                            </Link>
                        </Col>
                    </Row>
                </Div>
            </Div>
        </header>
    )
  }
  
  export default AppHeader