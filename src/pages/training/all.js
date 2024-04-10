import SearchBar from "@/components/SearchBar";
import TrainingPage from "@/components/TrainingLog";
import SideBar from "@/components/sideBar";
import { useEffect, useState } from "react";

export default function AllTraining() {
    const [userName, setUserName] = useState(null);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
      setUserName(localStorage.getItem("userName"));
      if (localStorage.getItem("userName") === null) {
        window.location.href = "/login";
      }
    }, []);

    useEffect(() => {
        setAdmin(localStorage.getItem("admin"));
        if (localStorage.getItem("admin") === "false") {
            console.log(localStorage.getItem("admin"));
            window.location.href = "/training";
        }
      }, []);

      return (
        userName !== null && admin === "true" ? 
        <div className="flex flex-col h-fit">
        <SearchBar />
        <div className="flex flex-row">
            <SideBar name={userName} isAdmin={admin} curr={2}/>
            <div className="flex flex-col w-full">
            <TrainingPage adminPage={true}/>
            </div>
        </div>
        </div> :
        <></>
    )
}