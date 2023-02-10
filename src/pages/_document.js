import Document, { Html, Head, Main, NextScript } from 'next/document'
import { Provider as StyletronProvider } from 'styletron-react';
import { styletron } from '../../styletron'

const RESET_STYLES = `
html,body {min-height:100vh;}
`;

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () => originalRenderPage({
            enhanceApp: (App) => (props) => <StyletronProvider value={styletron}><App {...props} /></StyletronProvider>,
        });

        const initialProps = await Document.getInitialProps(ctx);

        const stylesheets = styletron.getStylesheets() || [];

        return { ...initialProps, stylesheets };
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta
                        name="description"
                        content="The home base for guardians seeking to manage their Destiny 2 clans."
                    />
                    <meta name="monetag" content="6e3db144c661dd5f91979c93ac705161" />
                    <meta property="og:title" content="ClanBase | Home Base for all Destiny 2 Clans" />
                    <meta
                        property="og:description"
                        content="The home base for guardians seeking to manage their Destiny 2 clans."
                    />
                    <meta
                        property="og:image"
                        content="https://www.myclanbase.com/destinyBackgroundOverlay.png"
                    />
                    <meta name="google-site-verification" content="1bBGYobwBorHQSKGygOq8FXHVszmVbrt1qyVVV595rQ" />

                    {this.props.stylesheets.map((sheet, i) => (
                        <style
                            className="_styletron_hydrate_"
                            dangerouslySetInnerHTML={{ __html: sheet.css }}
                            media={sheet.attrs.media}
                            data-hydrate={sheet.attrs['data-hydrate']}
                            key={i}
                        />
                    ))}
                    <style type="text/css">{RESET_STYLES}</style>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;