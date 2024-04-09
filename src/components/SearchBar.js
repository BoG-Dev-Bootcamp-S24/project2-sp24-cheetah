import React from 'react';

const SearchBar = () => {
    return (
        <div className="pl-6 py-3 border-b-4 border-gray-400">
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
                <input
                    id="search-bar"
                    className="ml-2 pl-10 py-1 rounded-md border border-gray-500 w-1/3 placeholder-gray-600
                    bg-[url('../../public/images/searchLogo.png')] bg-no-repeat bg-1.25 bg-left-0.75"
                    placeholder="Search"
                />
                <div className="w-44"></div>
                {/* </div> */}
            </div>
        </div>
    );
};

export default SearchBar;
