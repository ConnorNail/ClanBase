import App from 'next/app'
import { Provider as StyletronProvider } from 'styletron-react'
import { styletron } from '../../styletron'
import { SessionProvider } from "next-auth/react"
import './index.css';

export default class MyApp extends App {
  render() {
    const { Component, pageProps: { session, ...pageProps } } = this.props
    return (
      <SessionProvider session={session}>
        <StyletronProvider value={styletron}>
          <Component {...pageProps} />
        </StyletronProvider>
      </SessionProvider>
    )
  }
}