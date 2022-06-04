import { styled, useStyletron } from 'styletron-react'
import React, { useState } from 'react';
import { Div, Anchor, Text, Row, Col, Input, Icon } from "atomize";
import Link from 'next/link'

const AppHeader = () => {
    const [css] = useStyletron()

    const tempInput = ''
    const [input, setInput] = useState('')

    function handleSearch(e) {
        setInput(tempInput)
        console.log(tempInput)
    }

    return (
        <header>
            <Div bg="brand900" rounded="xl" m={{t: "-1rem", l: "-1rem", r: "-1rem"}}>
                <Row>
                    <Col>
                        <Div>
                            <Link href="/">
                                <Anchor tag="h1" textSize="display3" textColor="white" hoverTextColor="black800" m="2rem">CLANBASE</Anchor>
                            </Link>
                        </Div>
                    </Col>
                    <Col>
                        <Input
                            placeholder="Search"
                            m="3rem"
                            onInput={e => {tempInput = e.target.value}}
                            onKeyPress={e => {
                                if (e.key === "Enter") {
                                    handleSearch(e)
                                }
                            }}
                            suffix={
                                <Icon
                                    name="Search"
                                    size="20px"
                                    cursor="pointer"
                                    onClick={e => handleSearch(e)}
                                    pos="absolute"
                                    top="50%"
                                    right="1rem"
                                    transform="translateY(-50%)"
                                />
                            }
                        />
                    </Col>
                </Row>
                <Row>{input}</Row>
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
        </header>
    )
  }
  
  export default AppHeader