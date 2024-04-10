import React from 'react';

const TopBar = () => {
    return (
        <div className="pl-6 py-3 border-b-2 border-gray-400 shadow">
            <div id="menu" className="flex items-center justify-between">
                <div className="flex items-center w-40">
                    <a className="menu-item" id="store-link">
                        <img
                            id="profilepic"
                            src="images/appLogo.png"
                            alt="logo"
                            width="40"
                            height="40"
                        />
                    </a>
                    <a className="menu-item text-2xl font-bold ml-1">Progress</a>
                </div>
                {/* <div className="relative ml-70"> */}
                    {/* <img
                        id="search-icon"
                        src="images/searchLogo.png"
                        alt="search icon"
                        className="absolute left-20 top-1/2 transform -translate-y-1/2 w-5 h-auto"
                    /> */}
                <div className="w-44"></div>
                {/* </div> */}
            </div>
        </div>
    );
};

export default TopBar;
