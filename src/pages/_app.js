import '@/styles/app.scss';
import { AppContextProvider } from '../context/AppContext';

export default function App({ Component, pageProps }) {
    return (
        <AppContextProvider>
            <Component {...pageProps} />
        </AppContextProvider>
    );
}
