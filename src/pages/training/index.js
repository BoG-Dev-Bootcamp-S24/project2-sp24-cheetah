import ProfileCard from "@/components/ProfileCard";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import TrainingPage from "@/components/TrainingLog";

export default function Training() {
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
            <TrainingPage />
            </div>
        </div>
        </div> :
        <></>
    )
}