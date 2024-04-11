import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/sideBar";
import { useEffect, useState } from "react";
import UsersPage from "@/components/ProfileCard";

export default function Users() {
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
      <SearchBar setSearch={setSearch}/>
      <div className="flex flex-row">
        <SideBar name={userName} isAdmin={admin} curr={4}/>
          <div className="flex flex-col w-full">
          <UsersPage search={search} />
          </div>
      </div>
      </div> :
      <></>
    )
}