import Image from "next/image";
import { Inter } from "next/font/google";
import TrainingLog from "../components/TrainingLog";
import ProfileCard from "@/components/ProfileCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col justify-center p-24 bg-white`}
    >
    <div className="flex flex-col items-left">
      <TrainingLog />
    </div>
    </main>
  );
}
