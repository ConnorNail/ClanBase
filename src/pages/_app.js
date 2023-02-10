import App from 'next/app'
import { Provider as StyletronProvider } from 'styletron-react'
import { styletron } from '../../styletron'
import './index.css';
import { Analytics } from '@vercel/analytics/react';
import Script from "next/script";
import { SessionProvider } from "next-auth/react"
import useSWR, { SWRConfig } from 'swr'
// import Layout from '../components/layout';

export default class MyApp extends App {
  render() {
    const { Component, pageProps: { session, ...pageProps } } = this.props
    return (
      <SessionProvider session={session}>
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            refreshInterval: 900000
          }}
        >
          <StyletronProvider value={styletron}>
            {/* <Layout> */}
              {/* <Script id="Adsense-id" data-ad-client="ca-pub-5349675379874975" async={true} strategy="beforeInteractive" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" onError={ (e) => { console.error('Script failed to load', e) }}/> */}
              <Component {...pageProps} />
              <Analytics />
            {/* </Layout> */}
          </StyletronProvider>
        </SWRConfig>
      </SessionProvider>
    )
  }
}