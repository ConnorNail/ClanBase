import { styled, useStyletron } from 'styletron-react'
import React, { useState } from 'react';
import { Div, Anchor, Row, Col, Text, Button, Image } from "atomize";
import Link from 'next/link'
import { useRouter } from 'next/router'

const AppFooter = () => {
    const [css] = useStyletron()

    const router = useRouter()

    return (
        <footer>
            <Div d="flex">
                <Div border={{ x: "1.5px solid", b: "1.5px solid" }} borderColor="cbWhite" rounded="0 0 10px 10px" w="100%" h="1.5rem" m={{ b: "1rem", x: "1rem" }} d="flex" justify="center" align="flex-end">
                    <Div bg="cbWhite" w="50%" h="0.75rem" rounded="10px 10px 0 0"></Div>
                </Div>
            </Div>
            <Div bg="cbRed" border={{ t: "1px solid" }} borderColor="cbWhite">
                <Row p={{ x: "2rem", t: "0.75rem" }}>
                    <Col >
                        <Text textColor="cbWhite" textSize="caption" textAlign="left">
                            © 2023 ClanBase
                        </Text>
                    </Col>
                    <Col size="flex">
                        <Link href="/">
                            <Anchor d="block" textSize="paragraph" textColor="cbWhite" hoverTextColor="cbBlue" >
                                Privacy Policy
                            </Anchor>
                        </Link>
                    </Col>
                </Row>
                <Row p={{ x: "2rem", b: "0.75rem" }}>
                    <Col d="flex" justify="flex-start">
                        <Button m={{ r: "0.5rem", y: "0.5rem" }} h="1.5rem" w="1.5rem" p="0rem" shadow="5" bg="none" onClick={() => location.assign("https://twitter.com/clanbasedev")}>
                            <Image src="/twitter.svg" alt="twitter" />
                        </Button>
                        <Button m="0.5rem" h="1.5rem" w="1.5rem" p="0.3rem" shadow="5" bg="#5865F2" onClick={() => location.assign("https://discord.gg/WDQC97ybAV")}>
                            <Image src="/discord.svg" alt="discord" />
                        </Button>
                        <Button m="0.5rem" h="1.5rem" w="1.5rem" p="0rem" shadow="5" bg="#FF5E5B" onClick={() => location.assign("https://www.patreon.com/clanbase")}>
                            <Image src="/ko-fi.png" alt="patreon" />
                        </Button>
                    </Col>
                    <Col>
                        <Text textColor="cbWhite" textSize="caption" textAlign="right" style={{fontStyle: "italic"}}>
                            Destiny 2 and all related media © Bungie Inc.
                        </Text>
                    </Col>
                </Row>
            </Div>
        </footer>
    )
}

export default AppFooter