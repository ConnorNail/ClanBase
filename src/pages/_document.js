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
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5349675379874975" crossOrigin="anonymous"></script>
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