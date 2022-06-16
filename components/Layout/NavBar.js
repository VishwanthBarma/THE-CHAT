import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ChatsUser from '../Chats/ChatsUser'
import { GrFormSearch } from "react-icons/gr";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import LoadingChatSearch from '../Loading/LoadingChatSearch';
import { useCollection } from 'react-firebase-hooks/firestore';

function NavBar() {
    const [input, setInput] = useState("");
    const [user] = useAuthState(auth);
    const [loadingSearch, setLoadingSearch] = useState(false);

    // for search functionality
    const [otherUsers, setOtherUsers] = useState(null);
    const [searchResults, setSearchResults] = useState([]);


    const [userChatList, loading] = useCollection(db.collection("chats")
         .where("users", 'array-contains', user.email));

    useEffect(() => {
        const getOtherUsers = async () => {
            const q = query(collection(db, "users"), where("email", "!=", user?.email));
            const querySnapshot = await getDocs(q);
            setOtherUsers(querySnapshot);
        };
        getOtherUsers();
    }, []);

    useEffect(() => {
        setLoadingSearch(true);
        setSearchResults(() => otherUsers?.docs?.filter(user => user.data().email.includes(input?.toLowerCase())));
        setLoadingSearch(false);
    }, [input]);


    /*
    * chatAlreadyExists([seaching user email]) -> checks for user in chat of particular person.
    */
    const chatAlreadyExists = ( recipientEmail ) => 
        !!userChatList?.docs.find(
            chat => chat.data().users.find(user => user === recipientEmail)?.length > 0
        );


    /*
    *   addUserToChats([searchUser]) => will add user to the chats if
    *   not exists in the userChatList
    */
    const addUserToChats = (searchUser) => {
        if(!chatAlreadyExists(searchUser.email)){
            db.collection("chats").add({
                users: [user.email, searchUser.email],
            });
        } 
    };

  return (
    <div className="p-2 bg-gray-200 dark:bg-neutral-800 h-screen w-20 sm:w-60 flex flex-col space-y-3 items-center sticky left-0 top-0">
        
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
            <input type='text' value={input} onChange={e => setInput(e.target.value)} placeholder='search users' className='bg-transparent w-[90%] items-center outline-none dark:text-slate-200 text-slate-800 hidden sm:inline'></input>
            <GrFormSearch className="sm:hidden h-8 w-8 opacity-50 dark:opacity-100"/>
        </div>

        {/* Chats */}

        <div className="bg-gray-300 dark:bg-neutral-700 max-h-[30rem] pb-3 w-full rounded-md">
            <div className="dark:bg-neutral-900 bg-white rounded-t-md p-1 px-2">
                <h1 className="font-bold dark:text-orange-400">Chats</h1>
            </div>
            <div className="p-1 py-2 flex max-h-[28rem] flex-col space-y-2 items-center overflow-y-scroll">

                {
                    !loading?
                        userChatList?.docs.length != 0
                        ?
                        userChatList?.docs.map(chat => (<ChatsUser key={chat.id} id={chat.id} isSearchUser={false} user={chat.data()} />))       
                        :
                        <h1 className="font-semibold text-red-500">No Chats</h1>
                    :
                    <LoadingChatSearch />
                }
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
                        !loadingSearch
                        ?
                            searchResults?.length != 0
                            ?
                            searchResults?.map(user =>
                                !chatAlreadyExists(user.data().email) &&
                                <ChatsUser key={user.id} isSearchUser={true} user={user.data()} addUserToChats={addUserToChats}/>
                            )
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