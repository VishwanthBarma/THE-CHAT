import { ThemeProvider } from 'next-themes'
import Layout from '../components/Layout/Layout'
import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import Login from './Login';
import { auth } from '../firebase';
import LoadingBounce from '../components/Loading/LoadingBounce';

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  if(loading) return <LoadingBounce />;
  if(!user) return (<Login />);

  return(
    <ThemeProvider enableSystem={true} attribute='class'>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  ) 
}

export default MyApp
