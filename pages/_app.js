import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../styles/globals.css'
import Navigation from '../components/navigation/Navigation'

const queryClient = new QueryClient()


function MyApp({ Component, pageProps }) {



  return <QueryClientProvider client={queryClient}>
            <Navigation>
                <Component {...pageProps}/>
            </Navigation>
        </QueryClientProvider>
}

export default MyApp
