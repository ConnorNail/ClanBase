import App from 'next/app'
import { Provider as StyletronProvider } from 'styletron-react'
import { styletron } from '../../styletron'
import './index.css';
import { SessionProvider } from "next-auth/react"
import useSWR, { SWRConfig } from 'swr'

export default class MyApp extends App {
  render() {
    const { Component, pageProps: { session, ...pageProps } } = this.props
    return (
      <SessionProvider session={session}>
        <StyletronProvider value={styletron}>
          <SWRConfig
            value={{
              revalidateOnFocus: false,
              refreshInterval: 900000
            }}
          >
            <Component {...pageProps} />
          </SWRConfig>
        </StyletronProvider>
      </SessionProvider>
    )
  }
}