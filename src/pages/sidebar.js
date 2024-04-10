import React from 'react';
import SideButton from './sideButton';
import Link from 'next/link';

const SideBar = ({name, isAdmin}) => {
    return (
        <div className="h-3/4 w-1/4 bg-white ">
            <div className="h-1/6" w-full>
                {/*change to="" to reflect links to respective pages. currently, these 2 sidebuttons have test values*/}
                <SideButton offImage='images/inactiveTrainingLogs.png' onImage='images/activeTrainingLogo.png' text='Training logs' to='https://en.wikipedia.org/wiki/Training#:~:text=Training%20is%20teaching%2C%20or%20developing,%2C%20capacity%2C%20productivity%20and%20performance.'></SideButton>
                <SideButton offImage='images/inactiveAnimalLogo.png' onImage='images/activeAnimalsLogo.png' text='Animals' to='https://kids.nationalgeographic.com/animals'></SideButton>
            </div>

            {isAdmin && (
                <div className="text-black border-t-2 border-black mt-6" >
                    <p>Admin access</p>
                    <SideButton offImage='images/inactiveAllTrainingLogo.png' onImage='images/activeAllTrainingLogo.png' text='All training' to=''></SideButton>
                    <SideButton offImage='images/inactiveAllAnimalsLogo.png' onImage='images/activeAllAnimalsLogo.png' text='All animals' to=''></SideButton>
                    <SideButton offImage='images/inactiveAllUsersLogo.png' onImage='images/activeAllUsersLogo.png' text='All users' to=''></SideButton>
                </div>
            )}

            <div className="flex h-12 w-full border-t-2 border-black mt-36 pt-2">
                
                        <p className="text-white text-center text-2xl bg-red-600 rounded-full h-10 w-10">{name.charAt(0).toUpperCase()}</p>{/*Style the profile icon*/}

                        {isAdmin ? (
                            <div className="text-black">
                                <p style={{ fontWeight: 'bold' }}>{name}</p>
                                <p>Admin</p>
                            </div>
                        ) : (
                            <div>
                                <p style={{ fontWeight: 'bold' }}>{name}</p>
                            </div>
                        )}
                    
                    <Link href="https://tailwindcss.com/"> {/*change to logout route*/}
                        <button>
                            <img src='/images/logoutLogo.png'></img>
                        </button>
                    </Link>
            </div>

        </div>
    );
};

export default SideBar;