import React, { useState } from 'react'
import { db } from '../../firebase';
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import moment from 'moment';


function ChatScreen({chat, messages}) {
    const date = new Date(1970, 0, 1);
    date.setSeconds(chat.users[4].seconds);
    const [msgInput, setMsgInput] = useState("");
    const handleSubmit = event => {
        event.preventDefault();
        console.log("Form Submitted...");
    }
  return (
    <div className="">
        {/* Header part */}
        <div className="h-16">    
            <div className="bg-black fixed h-16 top-0 right-0 left-20 flex flex-col justify-center sm:left-60 p-2">
                <h1 className="font-bold text-black dark:text-amber-300">{chat?.users[2]}</h1>
                <div className="flex space-x-1 text-sm">
                    <h1 className="dark:text-slate-300">Last Active:</h1>
                    {
                        moment(date).fromNow() ?
                        <h1 className="dark:text-green-300 text-black font-semibold opacity-50">{moment(date).fromNow()}</h1>:
                        <h1 className="dark:text-red-300 text-black font-semibold">Unavailable</h1>                
                    }
                </div>
            </div>
        </div>

        {/* Middle part */}
        <div className="overflow-y-scroll max-h-[48rem]">
                    {/* Messages Filed */}
        </div>

        {/* Last part */}
        <div className="h-16">
            <div className="bg-black fixed h-16 bottom-0 right-0 left-20 sm:left-60 p-2 flex items-center">
                <form onSubmit={handleSubmit} className="flex space-x-2 justify-between w-full">
                    <input className="bg-transparent outline-none font-semibold w-full" type="text" value={msgInput} onChange={e => setMsgInput(e.target.value)} placeholder="type text message"></input>
                    <div className="bg-sky-500 w-16 flex justify-center p-3 rounded-md">
                        <button type="submit" className="font-semibold">Send</button>
                    </div>
                </form>
            </div>
        </div>
        

  











        {/* Chatting Message Screen */}
        {/* <div className="abosulute top-20 bottom-16 overflow-y-scroll">
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1><h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1> <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1> <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>





            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
            <h1 className="text-white">Hello</h1>
        </div> */}

        {/* Input Text Field */}
        {/* <div className="bg-white h-16 flex items-center w-full fixed bottom-0 z-50 p-1">
            <form onSubmit={handleSubmit} className="flex space-x-2">
                <input className="p-4 outerline-none bg-transparent w-full text-black font-semibold" type="text" value={msgInput} onChange={e => setMsgInput(e.target.value)} placeholder="type text message"></input>
                <button type="submit" className="font-semibold text-black bg-sky-500 rounded-md w-24">Send</button>
            </form>
        </div> */}
        {/* <div className="fixed h-18 bottom-0">
            <form onSubmit={handleSubmit} className="w-full flex">
                <input className="p-2 w-full h-18" type="text" value={msgInput} onChange={e => setMsgInput(e.target.value)} placeholder="type text message"></input>
                <button type="submit" className="font-semibold text-black bg-sky-500 rounded-md p-2 px-5">Send</button>
            </form>
        </div> */}
    </div>
  )
}

export default ChatScreen;