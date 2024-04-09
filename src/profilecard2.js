import React from 'react';

const ProfileCard = () => {
  return (
    <div className=" bg-white hover:border hover:border-solid hover:border-gray-400">
      <a className="menu-item text-2xl font-bold mr-4 text-gray-600">All Users</a>
      <hr className="w-18 border-t-2 mb-10" />
      <div className="flex items-center">
        <div className="border border-gray-700 rounded-md p-2 flex items-center"> {/* New container for image and admin info */}
          <a className="menu-item" id="store-link">
            <img
              id="profilepic"
              src="images/bogLlogo.png"
              alt="logo"
              width="60"
              height="60"
            />
          </a>
          <div className="flex flex-col items-start ml-4">
            <a className="menu-item text-2xl font-bold mr-4 text-gray-600">Long Lam</a>
            <a className="text-gray-600">Admin • Atlanta, Georgia</a>
          </div>
        </div>
      </div>
    </div>
  );
};



export default ProfileCard;
