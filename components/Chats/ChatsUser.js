import React from 'react'

function ChatsUser({ searchUser, user}) {
  return (
    <div className="p-1 px-2 w-full flex items-center space-x-1 rounded-md bg-gray-200 dark:bg-neutral-800 hover:opacity-90 active:opacity-100 cursor-pointer hover:border-gray-900 hover:dark:border-slate-300 hover:border-[1px]">
        <div>
            <img className="object-cover rounded-full h-11 w-11" src={user.photoURL}></img>
        </div>
        <div className="hidden sm:inline">
            <h1 className="text-[14px] font-semibold dark:text-slate-300 truncate">{user.displayName}</h1>
            {
              searchUser &&
              <>
                <h2 className="text-[11px] font-semibold text-slate-700 dark:text-slate-400 truncate">{user.email}</h2>
              </>
            }
        </div>
    </div>
  )
}

export default ChatsUser