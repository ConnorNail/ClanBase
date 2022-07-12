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
        async jwt({ token, user, account }) {
          if (account && user) {
            return {
              ...token,
              accessToken: user.data.token,
              refreshToken: user.data.refreshToken,
            };
          }
    
          return token;
        },
    
        async session({ session, token }) {
          session.user.accessToken = token.accessToken;
            
          return session;
        },
      },
})