import Image from "next/image";
import { Inter } from "next/font/google";
import TrainingLog from "../components/TrainingLog";
import ProfileCard from "@/components/ProfileCard";
import SearchBar from "@/components/SearchBar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  
  return (
    <div className="flex flex-col">
      <SearchBar />
      <div className="flex flex-row">
        <ProfileCard />
        <TrainingLog />
      </div>
    </div>
  );
}
