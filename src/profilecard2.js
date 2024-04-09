import React from 'react';

const ProfileCard = () => {
    return (
        <div className="h-screen flex flex-col justify-end items-start p-10 bg-white hover:border hover:border-solid hover:border-gray-400">
            <a className="menu-item text-2xl font-bold mr-4 text-gray-600">All Users</a>
            <hr className="w-18 border-t-2 mb-10" />
            <div className="flex items-center">
                <a className="menu-item" id="store-link">
                    <img
                        id="profilepic"
                        src="images/appLogo.png"
                        alt="logo"
                        width="60"
                        height="60"
                    />
                </a>
                <div className="flex flex-col items-start">
                    <a className="menu-item text-2xl font-bold mr-4 text-gray-600">Long Lam</a>
                    <a className="text-gray-600">Admin • Atlanta, Georgia</a>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
