import NextAuth from "next-auth";
import BungieProvider from "next-auth/providers/bungie";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        BungieProvider({
            clientId: process.env.BUNGIE_CLIENT_ID,
            clientSecret: process.env.BUNGIE_SECRET,
            headers: {
                "X-API-Key": process.env.BUNGIE_API_KEY
            },
            authorization: {
                url: 'https://www.bungie.net/en/OAuth/Authorize?client_id={' + process.env.BUNGIE_CLIENT_ID + '}&response_type=code',
                params: {
                    scope: '',
                },
            }
        }),
    ],
    logger: {
        error(code, metadata) {
            log.error(code, metadata)
        },
        warn(code) {
            log.warn(code)
        },
        debug(code, metadata) {
            log.debug(code, metadata)
        }
    },
    theme: {
        colorScheme: "dark"
    }
})