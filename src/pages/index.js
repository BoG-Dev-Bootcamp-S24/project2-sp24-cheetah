import Image from "next/image";
import { Inter } from "next/font/google";
import TrainingLog from "../components/TrainingLog";
import ProfileCard from "@/components/ProfileCard";
import SearchBar from "@/components/SearchBar";
import AnimalPage from "@/components/AnimalPage";
import { useContext, useEffect } from "react";
import AuthContext from "@/components/AuthContext";

export default function Home() {
  const { contextName } = useContext(AuthContext);

  useEffect(() => {
    console.log(contextName);
    if (!contextName) {
      //window.location.href = "/login";
    }
  }, [contextName]);

  return (
    contextName !== null ? 
    <div className="flex flex-col h-fit">
      <SearchBar />
      <div className="flex flex-row">
        <ProfileCard />
        <div className="flex flex-col w-full">
          <AnimalPage />
          <TrainingLog />
        </div>
      </div>
    </div> :
    <></>
  );
}
