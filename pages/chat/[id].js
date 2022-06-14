import React from 'react'
import { db } from '../../firebase';
import { collection, query, where, getDocs, doc, getDoc, Query } from "firebase/firestore";
import moment from 'moment';
import ChatScreen from '../../components/Chats/ChatScreen';


function Chat({ data, messages }) {
    const chatUserData = JSON.parse(data);
    const date = new Date(1970, 0, 1);
    date.setSeconds(chatUserData.users[4].seconds);

  return (
    <div className="h-screen">
        <div className="flex p-3 flex-col space-y-1 dark:bg-black bg-white fixed w-full top-0 border-b-2 border-gray-500 z-50 shadow-xl shadow-black">
            <h1 className="font-semibold text-amber-300">{chatUserData?.users[2]}</h1>
            <div className="flex space-x-1 text-sm">
                <h1>Last Active:</h1>
                {
                    moment(date).fromNow() ?
                    <h1 className="text-green-300">{moment(date).fromNow()}</h1>:
                    <h1 className="text-red-300">Unavailable</h1>                
                }
            </div>
        </div>
        <div className="flex flex-col max-h-full overflow-y-auto">
                <ChatScreen key={chatUserData.id} chat={chatUserData} messages={messages}/>
        </div>
    </div>
  )
}

export default Chat;

export async function getServerSideProps(context){
    const { id } = context.query;
    const ref = db.collection("chats").doc(id);

    const chatRef = await ref.get();
    const data = {
        id: chatRef.id,
        ...chatRef.data(),
    }

    const messagesRef = await ref.collection("messages")
        .orderBy('timestamp', "asc")
        .get();
    
    const messages = messagesRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })).map(messages => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime()
    }));

    return{
        props: {
            data: JSON.stringify(data),
            messages: messages,
        }
    }
}