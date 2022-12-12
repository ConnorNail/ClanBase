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
            <Div bg="cbRed">
                <Row p={{ t: "1rem", l: "2rem", r: "2rem" }}>
                    <Col>
                        <Text textColor="cbWhite" textSize="caption">
                            © 2022 Clan Base
                        </Text>
                    </Col>
                    <Col size="flex">
                        <Link href="/">
                            <Anchor d="block" textSize="paragraph" textColor="cbWhite" hoverTextColor="cbWhite" >
                                Privacy Policy
                            </Anchor>
                        </Link>
                    </Col>
                </Row>
                <Row p={{ l: "2rem", b: "0.5rem" }}>
                    <Button m="0.5rem" h="1.5rem" w="1.5rem" p="0rem" shadow="5" bg="none" onClick={() => location.assign("https://twitter.com/clanbasedev")}>
                        <Image src="twitter.svg" alt="twitter" />
                    </Button>
                    <Button m="0.5rem" h="1.5rem" w="1.5rem" p="0.3rem" shadow="5" bg="#5865F2" onClick={() => location.assign("https://discord.gg/WDQC97ybAV")}>
                        <Image src="discord.svg" alt="discord" />
                    </Button>
                    <Button m="0.5rem" h="1.5rem" w="1.5rem" p="0.3rem" shadow="5" bg="#FF424D" onClick={() => location.assign("https://www.patreon.com/clanbase")}>
                        <Image src="patreon.png" alt="patreon" />
                    </Button>
                </Row>
            </Div>
        </footer>
    )
}

export default AppFooter