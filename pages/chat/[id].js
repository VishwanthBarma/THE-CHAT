import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebase';
import { collection, query, where, getDocs, doc, getDoc, Query } from "firebase/firestore";
import moment from 'moment';
import ChatScreen from '../../components/Chats/ChatScreen';
import { useAuthState } from 'react-firebase-hooks/auth';
import getRecipientEmail from '../../utils/getRecipientEmail';


function Chat({ data, messages }) {
    const [loggedUser] = useAuthState(auth);
    const chatUserData = JSON.parse(data);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getTheUser = async () => {
          const q = query(collection(db, "users"), where("email", '==', getRecipientEmail(chatUserData.users, loggedUser)));
          const querySnapshot = await getDocs(q);
          setUser(querySnapshot.docs[0].data());
        }
        getTheUser();
    }, [])


  return (
    <div className="h-screen">
        <ChatScreen key={chatUserData.id} chat={user} messages={messages}/>
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