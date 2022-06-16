import { useRouter } from 'next/router';
import React from 'react';
import StartChat from '../StartingScreens/StartChat';
import NavBar from './NavBar';

function Layout({ children }) {
  const router = useRouter();
  return (
    <div className="flex">
        <NavBar />
        <div className="w-full">
          <main>{ children }</main>
          {
            router.pathname === '/' && <StartChat /> 
          }
        </div>
    </div>
  )
}

export default Layout;