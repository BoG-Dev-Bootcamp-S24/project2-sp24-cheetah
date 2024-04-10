import AnimalPage from "@/components/AnimalPage";
import ProfileCard from "@/components/ProfileCard";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";

export default function Animals() {
    const [userName, setUserName] = useState(null);

    useEffect(() => {
      setUserName(localStorage.getItem("userName"));
      if (localStorage.getItem("userName") === null) {
        window.location.href = "/login";
      }
    }, []);

    return (
        userName !== null ? 
        <div className="flex flex-col h-fit">
        <SearchBar />
        <div className="flex flex-row">
            <ProfileCard />
            <div className="flex flex-col w-full">
            <AnimalPage />
            </div>
        </div>
        </div> :
        <></>
    )
}