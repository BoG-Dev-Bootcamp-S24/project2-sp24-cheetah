import { useEffect, useState } from "react";

export default function Users() {
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
}