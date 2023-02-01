import AppHeader from '../AppHeader'
import AppFooter from '../AppFooter'
import { ThemeProvider } from "atomize";
import theme from '../../theme'

export default function Layout({ children }) {
    return (
        <>
            <ThemeProvider theme={theme}>
                <AppHeader />
                <main >{children}</main>
                <AppFooter />
            </ThemeProvider>
        </>
    )
}