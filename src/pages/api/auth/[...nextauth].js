import NextAuth from "next-auth"
import BungieProvider from "next-auth/providers/bungie";

async function refreshAccessToken(token) {
  console.log("Refreshing Access Token")

  try {

    const encodedString = 'MzczMTY6RmxMU3F2MzdSeTNIaTR4NERpclRrM2dpc1FXQWNURmloZmlKSFQ2U1B0OA=='//Buffer.from(process.env.NEXT_PUBLIC_BUNGIE_CLIENT_ID + ':' + process.env.NEXT_PUBLIC_BUNGIE_SECRET).toString('base64');

    const response = await fetch('https://www.bungie.net/Platform/App/OAuth/Token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + encodedString,
        'X-API-Key': process.env.NEXT_PUBLIC_BUNGIE_API_KEY
      },
      body: new URLSearchParams({
        'client_id': process.env.NEXT_PUBLIC_BUNGIE_CLIENT_ID,
        'grant_type': "refresh_token",
        'refresh_token': token.refreshToken
      }).toString()
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    console.log(refreshedTokens)

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

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


      console.log(process.env.NEXT_PUBLIC_BUNGIE_API_KEY)
      console.log(session)
      session.user = token.user
      session.error = token.error

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // if (user) {
      //   token.id = user.id;
      // }
      // if (account) {
      //   token.accessToken = account.access_token;
      // }

      // Initial sign in
      if (account && user) {
        console.log('Initial sign in')
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + 3600 * 1000,
          refreshToken: account.refresh_token,
          user,
        }
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires - 300000)) {
        console.log('Access Token has not expired yet', token.accessTokenExpires)
        return token
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token)
    },
  },
  theme: {
    colorScheme: "dark", // "auto" | "dark" | "light"
    brandColor: "", // Hex color code
    logo: "../../clanbaseLogo.svg", // Absolute URL to image
    buttonText: "" // Hex color code
  },
}

export default NextAuth(authOptions)