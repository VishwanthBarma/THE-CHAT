import React, { useState } from 'react'
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


function ChatScreen({chat, messages}) {
    const [recepientUser, setRecepientUser] = useState(null);
    const [user] = useAuthState(auth);
    const router = useRouter();

    const [messageSnapshot] = useCollection(
        db.collection("chats").doc(router.query.id).collection("messages", "asc")
    );

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

    const date = new Date(1970, 0, 1);
    date.setSeconds(chat.you.lastSeen.seconds);
    const [msgInput, setMsgInput] = useState("");

    const handleSubmit = event => {
        event.preventDefault();

        // updating the user last seen
        db.collection("users").doc(user.uid).set(
            {
                lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
        );

        db.collection("chats").doc(router.query.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: msgInput,
            user: user.email,
            photoURL: user.photoURL,
        })

        setMsgInput("");

    }

    const getRecepientUser = async () => {
        const docRef = doc(db, "users", chat.myId);
        const docSnap = await getDoc(docRef);
        setRecepientUser(docSnap.data());
        date.setSeconds(recepientUser?.lastSeen.seconds);
    }



  return (
    <div className="">
        {/* Header part */}
        <div className="h-16">    
            <div className="bg-black fixed h-16 top-0 right-0 left-20 flex flex-col justify-center sm:left-60 p-2">
                {
                    chat.users[0] != user.email
                    ? getRecepientUser() && 
                    <h1 className="font-bold text-black dark:text-orange-400">{recepientUser?.displayName}</h1>
                    :
                    <h1 className="font-bold text-black dark:text-orange-400">{chat?.you.displayName}</h1>

                }
                <div className="flex space-x-1 text-sm">
                    <h1 className="dark:text-slate-300">Last Active:</h1>
                    {
                        moment(date).fromNow() ?
                        <h1 className="dark:text-orange-200 text-black font-semibold opacity-50">{moment(date).fromNow()}</h1>:
                        <h1 className="dark:text-red-300 text-black font-semibold">Unavailable</h1>                
                    }
                </div>
            </div>
        </div>

        {/* Middle part */}
        <div className="overflow-y-scroll max-h-[48rem]">
                    {/* Messages Filed */}
                    {
                        showMessages()
                    }
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
        
    </div>
  )
}

export default ChatScreen;