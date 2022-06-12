import { ThemeProvider } from 'next-themes'
import Layout from '../components/Layout/Layout'
import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import Login from './Login';
import { auth, db } from '../firebase';
import LoadingBounce from '../components/Loading/LoadingBounce';
import { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if(user){
      db.collection("users").doc(user.uid).set({
        email: user.email,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL: user.photoURL,
        displayName: user.displayName,
      },
      { merge: true}
      );
    }
  }, [user])

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
