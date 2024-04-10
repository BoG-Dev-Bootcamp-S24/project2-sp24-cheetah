import ProfileCard from "@/components/ProfileCard";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import TrainingPage from "@/components/TrainingLog";
import SideBar from "@/components/sideBar";

export default function Training() {
    const [userName, setUserName] = useState(null);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
      setUserName(localStorage.getItem("userName"));
      setAdmin(localStorage.getItem("admin"));
      if (localStorage.getItem("userName") === null) {
        window.location.href = "/login";
      }
    }, []);

    return (
        userName !== null ? 
        <div className="flex flex-col h-screen">
        <SearchBar />
        <div className="flex flex-row">
          <SideBar name={userName} isAdmin={admin} curr={0}/>
            <div className="flex flex-col w-full">
            <TrainingPage adminPage={false} />
            </div>
        </div>
        </div> :
        <></>
    )
}