import React from 'react'

function ChatsUser() {
  return (
    <div className="p-1 px-2 flex items-center space-x-1 rounded-md bg-gray-200 dark:bg-neutral-800 hover:opacity-90 active:opacity-100 cursor-pointer hover:border-gray-900 hover:dark:border-slate-300 hover:border-[1px]">
        <div>
            <img className="object-cover rounded-full h-11 w-11" src="https://github.com/VishwanthBarma.png"></img>
        </div>
        <div className="hidden sm:inline">
            <h1 className="text-[14px] font-semibold dark:text-slate-300">FullName</h1>
            <h2 className="text-[11px] font-semibold text-slate-700 dark:text-slate-400">example@gmail.com</h2>
        </div>
    </div>
  )
}

export default ChatsUser