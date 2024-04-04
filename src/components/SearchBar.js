import React from 'react';

const SearchBar = () => {
    return (
        <html style={{ margin: '0px 0' }}>
            <body style={{ margin: '10px 0' }}>
                <div id="menu" className="flex items-center">
                    <a className="menu-item" id="store-link">
                        <img
                            id="profilepic"
                            src="images/appLogo.png"
                            alt="logo"
                            width="40"
                            height="40"
                        />
                    </a>
                    <a className="menu-item text-2xl font-bold mr-4">Progress</a>
                    <div className="relative ml-70">
                        <img
                            id="search-icon"
                            src="images/searchLogo.png"
                            alt="search icon"
                            className="absolute left-20 top-1/2 transform -translate-y-1/2 w-5 h-auto"
                        />
                        <input
                            id="search-bar"
                            className="ml-2 px-2 py-1 rounded-md border border-gray-500 w-400"
                            placeholder="Search..."
                        />
                    </div>
                </div>

                <hr className="mt-10" />
            </body>
        </html>
    );
};

export default SearchBar;
