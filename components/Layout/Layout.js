import React from 'react';
import NavBar from './NavBar';

function Layout({ children }) {
  return (
    <div className="flex">
        <NavBar />
        <div className="w-full">
          <main>{ children }</main>
        </div>
    </div>
  )
}

export default Layout;