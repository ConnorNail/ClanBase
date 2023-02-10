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
              <Script strategy="afterInteractive">{`(function(s,u,z,p){s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);})(document.createElement('script'),'https://inklinkor.com/tag.min.js',5709375,document.body||document.documentElement)`}</Script>
              
              
              <Component {...pageProps} />
              <Analytics />
            {/* </Layout> */}
          </StyletronProvider>
        </SWRConfig>
      </SessionProvider>
    )
  }
}