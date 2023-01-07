import NextAuth from "next-auth"
import BungieProvider from "next-auth/providers/bungie";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    BungieProvider({
      clientId: process.env.NEXT_PUBLIC_BUNGIE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_BUNGIE_SECRET,
      authorization: {
        url: "https://www.bungie.net/en/OAuth/Authorize?reauth=true",
        params: {
          scope: "",
        },
      },
      userinfo: {
        url: "https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/",
      },
      httpOptions: {
        headers: {
          "X-API-Key": process.env.NEXT_PUBLIC_BUNGIE_API_KEY,
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = token.id;
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
}

export default NextAuth(authOptions)