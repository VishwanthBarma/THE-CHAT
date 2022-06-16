import React, { useEffect, useRef, useState } from 'react'
import { auth, db } from '../../firebase';
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import moment from 'moment';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Message from '../Message/Message';
import { useCollection } from 'react-firebase-hooks/firestore';
import getRecipientEmail from '../../utils/getRecipientEmail';
import LoadingBounce from '../Loading/LoadingBounce';
import TimeAgo from 'timeago-react';
import StartChat from '../StartingScreens/StartChat';


function ChatScreen({data, messages}) {
    const [user] = useAuthState(auth);
    const [msgInput, setMsgInput] = useState("");
    const router = useRouter();

    const endOfMessagesRef = useRef(null);

    const [recipientSnapshot, loading] = useCollection(db.collection("users")
    .where("email", "==", getRecipientEmail(data.users, user))    
    )
    
    const chat = recipientSnapshot?.docs?.[0].data();
    
    const [messageSnapshot] = useCollection(
        db.collection("chats").doc(router.query.id).collection("messages")
            .orderBy('timestamp', "asc")
        );

    
    const handleSubmit = event => {
        event.preventDefault();
        // updating the user last seen
        db.collection("users").doc(user.uid).set(
            {lastSeen: firebase.firestore.FieldValue.serverTimestamp(),},
            { merge: true });
            
        db.collection("chats").doc(router.query.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: msgInput,
            user: user.email,
            photoURL: user.photoURL,
        })
        
        setMsgInput("");
    }
        
    const showMessages = () => {
        if(messageSnapshot){
            return messageSnapshot.docs.map((message) => 
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}
                    />
            );
        }else{
            return messages.map(message => <Message
                key={message.id}
                user={message.user}
                message={message}
            />)
        }
    }

    const scrollToBottom = () => {
        endOfMessagesRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }

  return (
    <div className="">
        {/* Header part */}
        {
            !loading?
            <>

        <div className="h-16">    
            <div className="bg-black fixed h-16 top-0 right-0 left-20 flex flex-col justify-center sm:left-60 p-2">
                <h1 className="font-bold text-black dark:text-orange-400">{chat?.displayName}</h1>
                <div className="flex space-x-1 text-sm">
                    <h1 className="dark:text-slate-300">Last Active:</h1>
                    {
                        chat?.lastSeen?.toDate()?
                        <h1 className="dark:text-orange-200 text-black font-semibold opacity-50">
                            <TimeAgo datetime={chat?.lastSeen?.toDate()}/>
                        </h1>:
                        <h1 className="dark:text-red-300 text-black font-semibold">Unavailable</h1>                
                    }
                </div>
            </div>
        </div>

        {/* Middle part */}
        <div className="overflow-y-scroll max-h-[48rem] p-3">
            {
                showMessages()
            }
            <div ref={endOfMessagesRef}></div>
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
        
            </>
            :
            <>
                <LoadingBounce />
            </>
        }
    </div>
  )
}

export default ChatScreen;