import Image from "next/image";
import { Inter } from "next/font/google";
import TrainingLog from "../components/TrainingLog";
import ProfileCard from "@/components/ProfileCard";
import SearchBar from "@/components/SearchBar";
import AnimalPage from "@/components/AnimalPage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  
  return (
    <div className="flex flex-col h-fit">
      <SearchBar />
      <div className="flex flex-row">
        <ProfileCard />
        <div className="flex flex-col w-full">
          <AnimalPage />
          <TrainingLog />
        </div>
      </div>
    </div>
  );
}
