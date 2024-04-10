import React, { useState } from 'react';
import Link from 'next/link';

const SideButton = ({ offImage, onImage,text,to, current}) => {
    const [isActive, setIsActive] = useState(false);

    const handleHover = () => {
        setIsActive(!isActive);
    };

    const handleClick = () => {
        window.location.href = to;
    }

    return (
        <div onClick={handleClick} className="">
            <button onMouseEnter={handleHover} onMouseLeave={handleHover}>
                {current ? 
                    <div className="flex bg-red-600 rounded-lg items-center py-1 pl-2 w-40 mt-1">
                        <img src={onImage} className="h-5"/>
                        <p className="text-white pl-2">{text}</p>
                    </div> :
                isActive ? (
                    <div className="flex bg-red-600 rounded-lg items-center py-1 pl-2 w-40 mt-1">
                        <img src={onImage} className="h-5"/>
                        <p className="text-white pl-2">{text}</p>
                    </div>
                ) : (
                    <div className="flex rounded-lg items-center py-1 pl-2 w-40 mt-1">
                        <img src={offImage} className="h-5"/>
                        <p className="text-black pl-2">{text}</p>
                    </div>
                )}
            </button>
        </div>
    );
};

export default SideButton;