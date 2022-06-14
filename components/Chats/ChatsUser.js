import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";


function ChatsUser({ searchUser, chatId, user, addUserToChats, firstEmail}) {
  const [toShowUser, setToShowUser] = useState(null);
  const [mainUser] = useAuthState(auth);
  const [getUser, setGetUser] = useState(null);

  const router = useRouter();
  const id = chatId;

  const handleClick = () => {
    if(searchUser){
      addUserToChats(user);
    }else{
      router.push(`/chat/${id}`);
    }
  }

  const getTheUser = async (recepientEmail) => {
    const docRef = doc(db, "users", user.myId);
    const docSnap = await getDoc(docRef);
    setGetUser(docSnap.data());
  }
  
  useEffect(() => {
    if(!searchUser){
      if(firstEmail === mainUser.email){
        setToShowUser(user.you);
      }else{
        getTheUser(firstEmail);
        setToShowUser(getUser);
      }
    }
  })

  return (
    <div onClick={() => handleClick()} className="p-1 px-2 w-full flex items-center space-x-1 rounded-md bg-gray-200 dark:bg-neutral-800 hover:opacity-90 active:opacity-100 cursor-pointer hover:border-gray-900 hover:dark:border-slate-300 hover:border-[1px]">
        <div>
            <img className="object-cover rounded-full h-11 w-11" src={searchUser ? user.photoURL : toShowUser?.photoURL}></img>
        </div>
        <div className="hidden sm:inline">
            <h1 className="text-[14px] font-semibold dark:text-slate-300 truncate">{searchUser ? user.displayName : toShowUser?.displayName}</h1>
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