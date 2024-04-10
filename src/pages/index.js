import { useRouter } from 'next/router';
import { useEffect } from 'react';


/*import SideBar from './sidebar'; // Assuming your Sidebar component is in './sidebar.js'

const Home = () => {
  return (
      <div className='h-screen w-screen'>
        <SideBar name="abi" isAdmin={true}/>
      </div>
    
  );
};

export default Home;*/

import Image from "next/image";
import { Inter } from "next/font/google";
import TrainingLog from "../components/TrainingLog";
import ProfileCard from "@/components/ProfileCard";
import SearchBar from "@/components/SearchBar";
import AnimalPage from "@/components/AnimalPage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col justify-center p-24 bg-white`}
    >
    <div className="flex flex-col items-left">
      <AnimalPage />
      <ProfileCard />
      <SearchBar />
      <TrainingLog />
    </div>
    </main>
  );
}
