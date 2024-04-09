import React from 'react';

const ProfileCard = () => {
  const profileData = [
    { name: 'Long Lam', location: 'Atlanta, Georgia', image: 'images/bogLlogo.png' },
    { name: 'Long Lam', location: 'Atlanta, Georgia', image: 'images/bogLlogo.png' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {profileData.map((profile, index) => (
        <div key={index} className="h-screen flex flex-col justify-end items-start p-10 bg-white hover:border hover:border-solid hover:border-gray-400">
          <div className="flex items-center">
            <a className="menu-item" id="store-link">
              <img
                id="profilepic"
                src={profile.image}
                alt="logo"
                width="60"
                height="60"
              />
            </a>
            <div className="flex flex-col items-start">
              <a className="menu-item text-2xl font-bold mr-4 text-gray-600">{profile.name}</a>
              <a className="text-gray-600">{profile.location}</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileCard;
