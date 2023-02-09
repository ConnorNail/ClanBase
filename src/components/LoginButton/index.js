import { Button, Image, Text, Div, Icon, Dropdown } from "atomize";
import { useSession, signIn, signOut } from "next-auth/react"
import getIdsForCurrentUser from "../../functions/getIdsForCurrentUser";
import useGetUserInfo from "../../functions/useGetUserInfo";
import useGetPlayerProfile from "../../functions/useGetPlayerProfile";
import getRecentChar from "../../functions/getRecentChar";
import React, { useState } from 'react';
import { useRouter } from 'next/router'

const LoginButton = () => {
    const { data: session, status } = useSession()
    const [open, setOpen] = useState(false)

    const router = useRouter()

    const menu = () => {
        return (
            <Div bg="cbRed" rounded="0 0 5px 5px">
                <Button
                    p="0.5rem"
                    bg="cbTransparent"
                    textColor="cbWhite"
                    hoverTextColor="cbBlue"
                    onClick={() => router.push('/accounts')}
                >
                    <Icon name="Settings" size="20px" color="cbWhite" m={{ r: "0.5rem" }} />
                    Settings
                </Button>
                <Button
                    p="0.5rem"
                    bg="cbTransparent"
                    textColor="cbWhite"
                    hoverTextColor="cbBlue"
                    onClick={() => signOut()}
                >
                    <Icon name="Logout" size="20px" color="cbWhite" m={{ r: "0.5rem" }} />
                    Signout
                </Button>
            </Div>
        )
    }

    const baseURL = 'https://www.bungie.net/'

    // Get signed in users info
    const userData = useGetUserInfo(status)

    // Get the Destiny id and type
    const ids = getIdsForCurrentUser(userData)

    // Get destiny profile
    const playerProfile = useGetPlayerProfile(ids?.membershipId, ids?.membershipType)

    const charInfo = playerProfile?.Response?.characters
    const d2Path = charInfo?.data[getRecentChar(charInfo)]?.emblemPath

    if (session) {
        return (
            <Div d="flex" align="center">
                <Dropdown
                    isOpen={open}
                    onClick={() => setOpen(!open)}
                    menu={menu()}
                    bg='cbTransparent'
                    focusBg="cbTransparent"
                    border="0px solid"
                    textColor="cbWhite"
                    textSize="paragraph"
                    fontFamily="Primary"
                    openSuffix={<></>}
                    closeSuffix={<></>}
                >
                    <Text textSize="subheader" textColor="cbWhite" hoverTextColor="cbBlue">
                        {session?.user?.name}
                    </Text>
                    {d2Path ? <Image h="2.5rem" w="auto" rounded="md" src={baseURL + d2Path} alt="" m={{ l: "0.75rem", r: "0.25rem" }} /> : <Icon name="Loading" size="20px" color="cbWhite" m={{ l: "0.75rem", r: "0.25rem" }} />}
                </Dropdown>
            </Div>
        )
    } else {
        return (
            <Button
                h="3.5rem"
                p="0.5rem"
                bg="cbTransparent"
                onClick={() => signIn('bungie')}
            >
                <Div d="flex" align="center">
                    <Text textSize="subheader" textColor="cbWhite" hoverTextColor="cbBlue" style={{ whiteSpace: "nowrap" }}>
                        Sign in With Bungie
                    </Text>
                </Div>
            </Button>
        )
    }
}

export default LoginButton