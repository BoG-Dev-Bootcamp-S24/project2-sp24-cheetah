import React, { useState } from 'react';
import Link from 'next/link';

const SideButton = ({ offImage, onImage,text,to}) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <Link href={to} className="">
            <button onClick={handleClick} className="h-10 w-full">
                {isActive ? (
                    <div className="flex h-full w-90 bg-red-600 rounded m-1">
                        <img src={onImage}/>
                        <p className="text-white ">{text}</p>
                    </div>
                ) : (
                    <div className="flex h-full w-90 rounded m-1">
                        <img src={offImage}/>
                        <p className="text-black ">{text}</p>
                    </div>
                )}
            </button>
        </Link>
    );
};

export default SideButton;
