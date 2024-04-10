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
    <main
      className={`flex min-h-screen flex-col justify-center p-24 bg-white`}
    >
    <div className="flex flex-col items-left">
      <SearchBar />
      <AnimalPage />
      <ProfileCard />
      <TrainingPage />
    </div>
    </main>
  );
}
