import Image from "next/image"
import quarterCircle from "../../public/images/quarterCircle.png"

export default function Login() {
    return (
        <>
            <div className="border-b-8">top bar</div>
            <div className="flex flex-col items-center">
                <div className="text-5xl font-bold mt-40">Login</div>
                <input type="text" placeholder="Email" className="border-b-2 border-red-600 w-1/3 mt-8 text-xl"/>
                <input type="text" placeholder="Password" className="border-b-2 border-red-600 w-1/3 mt-6 text-xl"/>
                <button className="bg-red-600 text-white mt-12 text-2xl pt-1 pb-1.5 px-56 rounded-xl">Log In</button>
                <div className="mt-5">Don't have an account? <a href="/signup" className="font-bold">Sign up</a></div>
            </div>
            <Image src={quarterCircle} alt="quarter circle" className="fixed bottom-0" width={180} height={180}/>
            <div className="fixed bottom-0 flex flex-col items-center w-full py-4 text-sm text-gray-600">
                <div>Made by Team Cheetah</div>
                <div>2023 BOG Developer Bootcamp</div>
            </div>
        </>
    )
}6