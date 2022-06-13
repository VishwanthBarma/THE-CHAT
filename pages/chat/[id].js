import React from 'react'
import { db } from '../../firebase';
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import moment from 'moment';
import TimeAgo from 'timeago-react';


function Chat({ data }) {
    const chatUserData = JSON.parse(data);
    const date = new Date(1970, 0, 1);
    date.setSeconds(chatUserData.users[4].seconds);
    console.log(moment(date).fromNow());

  return (
    <div>
        <>
        <h1 className="font-semibold text-amber-300">{chatUserData?.users[2]}</h1>
        <div className="flex space-x-1 text-sm">
            <h1>Last Active:</h1>
            {
                moment(date).fromNow() ?
                <h1 className="text-green-300">{moment(date).fromNow()}</h1>:
                <h1 className="text-red-300">Unavailable</h1>                
            }
        </div>
        </>
    </div>
  )
}

export default Chat;

export async function getServerSideProps(context){
    const { id } = context.query;
    const docRef = doc(db, "chats", id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    return{
        props: {
            data: JSON.stringify(data),
        }
    }
}