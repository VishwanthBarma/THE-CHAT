import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";
import getRecipientEmail from '../../utils/getRecipientEmail';


function ChatsUser({ isSearchUser, id, user, addUserToChats}) {
  const [loggedUser] = useAuthState(auth);
  const [chatUser, setChatUser] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    const getTheUser = async () => {
      const q = query(collection(db, "users"), where("email", '==', getRecipientEmail(user.users, loggedUser)));
      const querySnapshot = await getDocs(q);
      setChatUser(querySnapshot.docs[0].data());
    }
    if(!isSearchUser){
      getTheUser();
    }
  }, [])

  const handleClick = () => {
    isSearchUser ? addUserToChats(user) : router.push(`/chat/${id}`);
  }

  console.log(chatUser?.photoURL);

  return (
    <div onClick={() => handleClick()} className="p-1 px-2 w-full flex items-center space-x-1 rounded-md bg-gray-200 dark:bg-neutral-800 hover:opacity-90 active:opacity-100 cursor-pointer hover:border-gray-900 hover:dark:border-slate-300 hover:border-[1px]">
        <div>
            <img className="object-cover rounded-full h-11 w-11" src={isSearchUser ? user.photoURL : chatUser?.photoURL}></img>
        </div>
        <div className="hidden sm:inline">
            <h1 className="text-[14px] font-semibold dark:text-slate-300 truncate">{isSearchUser ? user.displayName : chatUser?.displayName}</h1>
            {
              isSearchUser &&
              <>
                <h2 className="text-[11px] font-semibold text-slate-700 dark:text-slate-400 truncate">{user.email}</h2>
              </>
            }
        </div>
    </div>
  )
}

export default ChatsUser