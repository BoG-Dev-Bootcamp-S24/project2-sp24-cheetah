import AnimalPage from "@/components/AnimalPage";
import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/sideBar";
import { useEffect, useState } from "react";

export default function Animals() {
    const [userName, setUserName] = useState(null);
    const [admin, setAdmin] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
      setUserName(localStorage.getItem("userName"));
      setAdmin(localStorage.getItem("admin"));
      if (localStorage.getItem("userName") === null) {
        window.location.href = "/login";
      }
    }, []);

    return (
        userName !== null ? 
        <div className="flex flex-col h-fit">
        <SearchBar setSearch={setSearch}/>
        <div className="flex flex-row">
            <SideBar name={userName} isAdmin={admin} curr={1}/>
            <div className="flex flex-col w-full">
            <AnimalPage adminPage={false} search={search} />
            </div>
        </div>
        </div> :
        <></>
    )
}