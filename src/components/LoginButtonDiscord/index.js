import { Button } from "atomize";
import { useSession, signIn, signOut } from "next-auth/react"

const LoginButtonDiscord = () => {
    const { data: session } = useSession()

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
            onClick={() => signIn('discord')}
        >
            Login
        </Button>
    )
}

export default LoginButtonDiscord