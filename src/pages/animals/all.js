import AnimalPage from "@/components/AnimalPage";
import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/sideBar";
import { useEffect, useState } from "react";

export default function AllAnimals() {
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
            window.location.href = "/animals";
        }
      }, []);

      return (
        userName !== null && admin === "true" ? 
        <div className="flex flex-col h-fit">
        <SearchBar />
        <div className="flex flex-row">
            <SideBar name={userName} isAdmin={admin} curr={3}/>
            <div className="flex flex-col w-full">
            <AnimalPage adminPage={true}/>
            </div>
        </div>
        </div> :
        <></>
    )
}