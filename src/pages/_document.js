import Document, { Html, Head, Main, NextScript } from 'next/document'
import { Provider as StyletronProvider } from 'styletron-react';
import { styletron } from '../../styletron'

const RESET_STYLES = `
html,body {min-height:100vh;}
body{margin:0;}
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