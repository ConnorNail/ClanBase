import { Button, Image, Text, Div } from "atomize";
import { useSession, signIn, signOut } from "next-auth/react"
import getIdsForCurrentUser from "../../functions/getIdsForCurrentUser";
import useGetUserInfo from "../../functions/useGetUserInfo";
import useGetPlayerProfile from "../../functions/useGetPlayerProfile";
import getRecentChar from "../../functions/getRecentChar";

const LoginButton = () => {
    const { data: session, status } = useSession()

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
            <Button
                h="3.5rem"
                p="0.5rem"
                bg="cbTransparent"
                onClick={() => signOut()}
            >
                <Div d="flex" align="center">
                    <Text textSize="subheader" textColor="cbWhite" hoverTextColor="cbBlue">
                        {session?.user?.name}
                    </Text>
                    <Image h="2.5rem" w="auto" rounded="md" src={baseURL + d2Path} alt="" m={{ l: "0.75rem", r: "0.25rem" }}/>
                </Div>
            </Button>
        )
    } else {
        return (
            <Button
                h="3.5rem"
                p="0.5rem"
                bg="cbGrey2"
                hoverShadow="4"
                onClick={() => signIn('bungie')}
            >
                <Div d="flex" align="center">
                    <Text m={{ x: "0.5rem" }} textSize="paragraph" textColor="cbWhite" hoverTextColor="cbBlue">
                        Sign in With Bungie
                    </Text>
                </Div>
            </Button>
        )
    }
}

export default LoginButton