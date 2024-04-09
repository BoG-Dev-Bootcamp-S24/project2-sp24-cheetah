import { useContext, useEffect } from "react";
import AuthContext from "@/components/AuthContext";

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
<<<<<<< HEAD
    <main
      className={`flex min-h-screen flex-col justify-center p-24 bg-white`}
    >
    <div className="flex flex-col items-left">
      <SearchBar />
      <AnimalPage />
      <ProfileCard />
      <TrainingLog />
    </div>
    </main>
=======
    <></>
>>>>>>> 19658bc93bb282b7fc622b4ff6fd49c7c880ca98
  );
}
