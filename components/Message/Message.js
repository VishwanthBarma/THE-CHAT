import moment from 'moment';
import React from 'react'

function Message({ user, message }) {
  return (
    <div className="flex flex-col w-fit border-[1px] border-sky-500 rounded-xl p-1 px-4 m-2">
        <h1 className="font-semibold">{message.message}</h1>
        <h1 className="text-[10px] text-slate-500">{ moment(message.timestamp).format('LT')}</h1>
    </div>
  )
}

export default Message