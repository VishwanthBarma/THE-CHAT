import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';


function Profile() {
    const [user] = useAuthState(auth);
    const {theme, setTheme} = useTheme();
    const [enabled, setEnabled] = useState();
  
    const changeTheme = () => {
      enabled ? setEnabled(false) : setEnabled(true);
      theme === 'light' ? setTheme('dark') : setTheme('light');
    }

  return (
    <div className="flex flex-col items-center p-10 space-y-5">
      <div className="h-40">
          <img src={user?.photoURL} className="h-40 rounded-full object-cover"></img>
      </div>
      <div className="flex flex-col items-center space-x-2">
        <h1 className="font-bold text-3xl">{user?.displayName}</h1>
        <h1 className="font-semibold text-slate-500">{user?.email}</h1>
      </div>
        {/* Dark Mode Switch Button */}
        <div className='space-x-2 p-3 items-center flex'>
          <h1 className='font-bold dark:text-white'>Dark Mode</h1>
          <Switch
            checked={enabled}
            onChange={changeTheme}
            className={`${enabled ? 'bg-slate-900 dark:bg-gray-600' : 'bg-slate-300'}
              relative inline-flex h-[28px] w-[52px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${enabled ? 'translate-x-6 bg-slate-200' : 'translate-x-0 bg-black'}
                pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
        </Switch>
        </div>


        {/* Logout */}
        <div className="bg-gray-500 rounded-xl p-3 hover:opacity-80 active:opacity-100">
          <button className="font-semibold dark:text-black text-white"onClick={() => auth.signOut()}>Logout</button>
        </div>

    </div>
  )
}

export default Profile