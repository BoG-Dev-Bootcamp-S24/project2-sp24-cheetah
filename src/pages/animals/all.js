import AnimalPage from "@/components/AnimalPage";
import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/sideBar";
import { useEffect, useState } from "react";

export default function AllAnimals() {
    const [userName, setUserName] = useState(null);
    const [admin, setAdmin] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
      setUserName(localStorage.getItem("userName"));
      if (localStorage.getItem("userName") === null) {
        window.location.href = "/login";
      }
    }, []);

    useEffect(() => {
        setAdmin(localStorage.getItem("admin"));
        if (localStorage.getItem("admin") === "false") {
            window.location.href = "/animals";
        }
      }, []);

      return (
        userName !== null && admin === "true" ? 
        <div className="flex flex-col h-fit">
        <SearchBar setSearch={setSearch} all={true}/>
        <div className="flex flex-row">
            <SideBar name={userName} isAdmin={admin} curr={3} all={true}/>
            <div className="flex flex-col w-full">
            <AnimalPage adminPage={true} search={search} />
            </div>
        </div>
        </div> :
        <></>
    )
}