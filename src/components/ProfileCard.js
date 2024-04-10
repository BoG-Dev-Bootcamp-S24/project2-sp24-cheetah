import React, { useContext, useEffect, useState } from 'react';
import logoutImg from '../../public/images/logoutLogo.png'
import Image from 'next/image';
import AuthContext from './AuthContext';

const ProfileCard = () => {
    const {logout, contextName} = useContext(AuthContext);
    const [loggedOut, setLoggedOut] = useState(false);
    
    function logoutHandler() {
        logout();
        setLoggedOut(true);
    }

    useEffect(() => {
        if (localStorage.getItem("userName") === null) {
            window.location.href = "/";
        }
    }, [loggedOut])

    return (
        <div className="mx-4 mt-4 flex">
            <div className="border-t-2 rounded-md flex w-48 pt-2 h-12 justify-between">
                <div className="flex">
                    <div className="circle bg-gray-400 text-white flex align-middle justify-center items-center rounded-full w-10 h-10 text-lg font-semibold">L</div>
                    <div className="flex flex-col items-start ml-2">
                        <div className="menu-item font-bold mr-4 text-gray-600">Long Lam</div>
                        <div className="text-gray-600 text-xs">Admin</div>
                    </div>
                </div>
                <div className="self-center">
                    <Image src={logoutImg} alt="logout" width={20} height={20} onClick={logoutHandler}/>
                </div>
            </div>
        </div>
    );
};



export default ProfileCard;
