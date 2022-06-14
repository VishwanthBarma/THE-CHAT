import React, { useState } from 'react'
import { db } from '../../firebase';
import { collection, query, where, getDocs, doc, getDoc, Query } from "firebase/firestore";
import moment from 'moment';
import ChatScreen from '../../components/Chats/ChatScreen';


function Chat({ data, messages }) {
    const chatUserData = JSON.parse(data);
    const [mine, setMine] = useState(null);
  return (
    <div className="h-screen">
        <ChatScreen key={chatUserData.id} chat={chatUserData} messages={messages}/>
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