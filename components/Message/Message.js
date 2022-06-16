import moment from 'moment';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

function Message({ user, message }) {
    const [loggedUser] = useAuthState(auth);
    
    const typeOfMessage = user == loggedUser.email ? 'sender' : 'receiver';

  return (
    <div className="flex p-1">
        <div className={`${typeOfMessage == 'sender' ? 'border-sky-600 ml-auto' : 'border-pink-600 justify-start'} flex flex-col w-fit border-[1px] rounded-xl p-1 px-4`}>
            <h1 className="font-semibold">{message.message}</h1>
            <h1 className="text-[10px] text-slate-500">{ moment(message.timestamp).format('LT')}</h1>
        </div>
    </div>
  )
}

export default Message