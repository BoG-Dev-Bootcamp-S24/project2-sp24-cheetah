import Image from "next/image";
import { Inter } from "next/font/google";
import TrainingLog from "../components/TrainingLog";
import ProfileCard from "@/profilecard2"
import { useContext, useEffect } from "react";
import AuthContext from "@/components/AuthContext";
import SearchBar from "@/components/SearchBar";
import AnimalPage from "@/components/AnimalPage";
import ProfileCard from "@/components/ProfileCard";
import TrainingPage from "@/components/TrainingLog";


export default function Home() {
  const {contextLogin} = useContext(AuthContext);

  useEffect(() => {
    contextLogin("admin", "66089adec3d1112d02a879eb", "true"); //temp auto login
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
