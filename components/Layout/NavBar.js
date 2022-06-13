import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ChatsUser from '../Chats/ChatsUser'
import { GrFormSearch } from "react-icons/gr";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import LoadingChatSearch from '../Loading/LoadingChatSearch';

function NavBar() {
    const [input, setInput] = useState(null);
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(false);

    const [otherUsers, setOtherUsers] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const getOtherUsers = async () => {
            const q = query(collection(db, "users"), where("email", "!=", user.email));
            const querySnapshot = await getDocs(q);
            setOtherUsers(querySnapshot);
        };
        getOtherUsers();
    }, []);

    useEffect(() => {
        setLoading(true);
        setSearchResults(() => otherUsers?.docs?.filter(user => user.data().email.includes(input.toLowerCase())));
        setLoading(false);
    }, [input]);

    // otherUsers?.docs?.map(doc => console.log(doc.id, doc.data()));


  return (
    <div className="p-2 bg-gray-200 dark:bg-neutral-800 h-screen w-20 sm:w-60 flex flex-col space-y-3 items-center sticky left-0">
        {/* Profile */}

        <Link href="/profile" passHref>
            <a className="w-full h-14">
                <div className="w-full flex items-center space-x-1 rounded-md bg-gray-400 dark:bg-neutral-700 hover:opacity-90 active:opacity-100 cursor-pointer">
                    <div className="h-14 w-14">
                        <img className="object-cover rounded-l-md h-14 sticky" src={user.photoURL} atl='avatar'></img>
                    </div>
                    <div className="hidden sm:inline overflow-hidden over">
                        <h1 className="text-[15px] truncate font-semibold dark:text-sky-400">{user.displayName}</h1>
                        <h2 className="text-[12px] truncate font-semibold text-slate-700 dark:text-slate-400 overflow-x-auto">{user.email}</h2>
                    </div>
                </div>
            </a>
        </Link>

        {/* Search */}

        <div className="w-full h-10 bg-slate-100 dark:bg-neutral-900 rounded-md flex items-center justify-center">
            <input type='text' value={input} onChange={e => setInput(e.target.value)} placeholder='search chat / users' className='bg-transparent w-[90%] items-center outline-none dark:text-slate-200 text-slate-800 hidden sm:inline'></input>
            <GrFormSearch className="sm:hidden h-8 w-8 opacity-50 dark:opacity-100"/>
        </div>


        {/* Chats */}

        <div className="bg-gray-300 dark:bg-neutral-700 max-h-[30rem] pb-3 w-full rounded-md">
            <div className="dark:bg-neutral-900 bg-white rounded-t-md p-1 px-2">
                <h1 className="font-bold dark:text-orange-400">Chats</h1>
            </div>
            <div className="p-1 py-2 flex max-h-[28rem] flex-col space-y-2 overflow-y-scroll">
                {/* <ChatsUser searchUser={false} user/> */}
            </div>
        </div>

        {/* Searched Profiles */}

        {
            input &&
            <>
                <div className="bg-gray-300 dark:bg-neutral-700 max-h-[18rem] pb-3 w-full rounded-md">
                    <div className="dark:bg-neutral-900 bg-white rounded-t-md p-1 px-2">
                        <h1 className="font-bold dark:text-orange-400">Users</h1>
                    </div>
                    <div className="p-1 py-2 flex max-h-[16rem] overflow-y-scroll flex-col items-center space-y-2">
                    {
                        !loading
                        ?
                            searchResults?.length != 0
                            ?
                            searchResults?.map(user => (<ChatsUser searchUser={true} user={user.data()} />))
                            :
                            <h1 className="font-semibold text-red-500">No Users</h1>
                        :
                        <LoadingChatSearch />
                    }
                    </div>
                </div>
            </>
        }

    </div>
  )
}

export default NavBar;