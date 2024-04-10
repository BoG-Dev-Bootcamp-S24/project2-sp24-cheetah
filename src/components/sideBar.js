import React, { useContext, useEffect, useState } from 'react';
import SideButton from './sideButton';
import AuthContext from './AuthContext';
import logoutImg from '../../public/images/logoutLogo.png'
import Image from 'next/image';


const ProfileCard = ({name, isAdmin}) => {
    const {logout} = useContext(AuthContext);
    const [loggedOut, setLoggedOut] = useState(false);
    
    function logoutHandler() {
        logout();
        setLoggedOut(true);
    }

    useEffect(() => {
        if (localStorage.getItem("userName") === null) {
            // window.location.href = "/";
        }
    }, [loggedOut])

    return (
        <div className="fixed bottom-0 w-40 ml-4 my-4 flex">
            <div className="border-t border-gray-400 flex w-full pt-2 h-12 justify-between">
                <div className="flex">
                    <div className="circle bg-gray-400 text-white flex align-middle justify-center items-center rounded-full w-10 h-10 text-lg font-semibold">{name[0].toUpperCase()}</div>
                    <div className="flex flex-col items-start ml-2">
                        <div className="menu-item font-bold mr-4 text-gray-600">{name.length <= 9 ? name : name.substring(0, 8) + "..."}</div>
                        {isAdmin ? <div className="text-gray-600 text-xs">Admin</div> : <></>}
                    </div>
                </div>
                <div className="self-center cursor-pointer">
                    <Image src={logoutImg} alt="logout" width={20} height={20} onClick={logoutHandler}/>
                </div>
            </div>
        </div>
    );
};

const SideBar = ({name, isAdmin, curr}) => {
    const [training, setTraining] = useState(false);
    const [animals, setAnimals] = useState(false);
    const [allTraining, setAllTraining] = useState(false);
    const [allAnimals, setAllAnimals] = useState(false);
    const [users, setUsers] = useState(false);

    useEffect(() => {
        if (curr === 0) {
            setTraining(true);
        } else if (curr === 1) {
            setAnimals(true);
        } else if (curr === 2) {
            setAllTraining(true);
        } else if (curr === 3) {
            setAllAnimals(true);
        } else if (curr === 4) {
            setUsers(true);
        }
    }, [])

    return (
        <div className="w-56 bg-white flex flex-col justify-between pt-4 border-r h-screen">
            <div className="ml-4">
                <div className="h-1/6 flex flex-col">
                    {/*change to="" to reflect links to respective pages. currently, these 2 sidebuttons have test values*/}
                    <SideButton offImage='images/inactiveTrainingLogs.png' onImage='images/activeTrainingLogo.png' text='Training logs' to='/training' current={training}></SideButton>
                    <SideButton offImage='images/inactiveAnimalLogo.png' onImage='images/activeAnimalsLogo.png' text='Animals' to='/animals' current={animals}></SideButton>
                </div>

                {isAdmin && (
                    <div className="text-black border-t border-gray-400 mt-10 flex flex-col mr-4" >
                        <div className="font-semibold pl-2 mt-3">Admin access</div>
                        <SideButton offImage='images/inactiveAllTrainingLogo.png' onImage='images/activeAllTrainingLogo.png' text='All training' to='/training/all' current={allTraining}></SideButton>
                        <SideButton offImage='images/inactiveAllAnimalsLogo.png' onImage='images/activeAllAnimalsLogo.png' text='All animals' to='/animals/all' current={allAnimals}></SideButton>
                        <SideButton offImage='images/inactiveAllUsersLogo.png' onImage='images/activeAllUsersLogo.png' text='All users' to='/users' current={users}></SideButton>
                    </div>
                )}
            </div>

            <ProfileCard name={name} isAdmin={isAdmin}/>

        </div>
    );
};

export default SideBar;