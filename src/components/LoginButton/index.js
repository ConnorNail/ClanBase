import { Button } from "atomize";
import { useSession, signIn, signOut } from "next-auth/react"

const LoginButton = () => {
    const { data: session } = useSession()

    if (session) {
        return (
            <Button
                h="3.5rem"
                p={{ x: "1.5rem" }}
                textSize="body"
                textColor="cbWhite"
                hoverTextColor="cbBlue"
                bg="cbGrey1"
                hoverBg="cbGrey2"
                m={{ r: "0.5rem" }}
                onClick={() => signOut()}
            >
                Signed in as {session?.user?.name}
            </Button>
        )
    } else {
        return (
            <Button
                h="3.5rem"
                p={{ x: "1.5rem" }}
                textSize="body"
                textColor="cbWhite"
                hoverTextColor="cbBlue"
                bg="cbGrey1"
                hoverBg="cbGrey2"
                m={{ r: "0.5rem" }}
                onClick={() => signIn('bungie')}
            >
                Login
            </Button>
        )
    }
}

export default LoginButton