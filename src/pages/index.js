import { useContext, useEffect } from "react";
import AuthContext from "@/components/AuthContext";
import SideBar from "@/components/sideBar";


export default function Home() {
  const {contextLogin} = useContext(AuthContext);

  useEffect(() => {
    //contextLogin("admin", "66089adec3d1112d02a879eb", "true"); //temp auto login
    if (localStorage.getItem("userName") === null) {
      window.location.href = "/login";
    } else {
      window.location.href= "/animals";
    }
  }, []);

  return (
    <div>
    </div>
  );
}
