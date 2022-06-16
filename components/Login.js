import { Router } from 'next/router';
import React from 'react'
import { auth, provider } from '../firebase'

function Login() {
    const signIn = () => {
      auth.signInWithPopup(provider).catch(alert);
    };

  return (
    <div className="flex flex-col justify-center items-center p-10 px-28 space-y-32">
    <div className="flex flex-col items-center justify-center space-y-3">
        <h1 className="text-sky-500 font-bold text-8xl">THE</h1>
        <h1 className="text-sky-500 font-bold text-8xl">CHAT</h1>
    </div>
        <button onClick={signIn} className="font-bold bg-slate-200 p-3 rounded-lg hover:opacity-90 active:opacity-100 dark:text-black text-black">Sign in with Google</button>
    </div>
  )
}

export default Login