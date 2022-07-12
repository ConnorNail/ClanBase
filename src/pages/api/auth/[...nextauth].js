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
                params: {
                    scope: '',
                },
            }
        }),
    ],
    debug: true,
    theme: {
        colorScheme: "dark"
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
          return true
        },
        async redirect({ url, baseUrl }) {
          return baseUrl
        },
        async session({ session, user, token }) {
          return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
          return token
        }
    }
})