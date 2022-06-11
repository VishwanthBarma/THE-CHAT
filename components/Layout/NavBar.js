import Link from 'next/link'
import React from 'react'
import ChatsUser from '../Chats/ChatsUser'
import { GrFormSearch } from "react-icons/gr";

function NavBar() {
  return (
    <div className="p-2 bg-gray-200 dark:bg-neutral-800 h-screen w-20 sm:w-60 flex flex-col space-y-3 items-center">
        {/* Profile */}

        <Link href="/profile" passHref>
            <a className="w-full h-13">
                <div className="flex items-center space-x-1 rounded-md bg-gray-400 dark:bg-neutral-700 hover:opacity-90 active:opacity-100 cursor-pointer">
                    <div>
                        <img className="object-cover rounded-l-md h-13 w-14" src="https://github.com/VishwanthBarma.png"></img>
                    </div>
                    <div className="hidden sm:inline">
                        <h1 className="text-[15px] font-semibold dark:text-sky-400">FullName</h1>
                        <h2 className="text-[12px] font-semibold text-slate-700 dark:text-slate-400">example@gmail.com</h2>
                    </div>
                </div>
            </a>
        </Link>

        {/* Search */}

        <div className="w-full h-10 bg-slate-100 dark:bg-neutral-900 rounded-md flex items-center justify-center">
            <input type='text' placeholder='search chat' className='bg-transparent w-[90%] items-center outline-none dark:text-slate-200 text-slate-800 hidden sm:inline'></input>
            <GrFormSearch className="sm:hidden h-8 w-8 opacity-50 dark:opacity-100"/>
        </div>


        {/* Chats */}

        <div className="bg-gray-300 dark:bg-neutral-700 h-screen w-full rounded-md">
            <div className="dark:bg-neutral-900 bg-white rounded-t-md p-1 px-2">
                <h1 className="font-bold dark:text-orange-400">Chats</h1>
            </div>
            <div className="p-1 flex flex-col space-y-2">
                <ChatsUser />
                <ChatsUser />
            </div>
        </div>
        
    </div>
  )
}

export default NavBar