import Image from "next/image"
import quarterCircle from "../../public/images/quarterCircle.png"

export default function SignUp() {
    return (
        <>
            <div className="border-b-8">top bar</div>
            <div className="flex flex-col items-center">
                <div className="text-5xl font-bold mt-20">Create Account</div>
                <input type="text" placeholder="Full Name" className="border-b-2 border-red-600 w-1/3 mt-8 text-xl"/>
                <input type="text" placeholder="Email" className="border-b-2 border-red-600 w-1/3 mt-6 text-xl"/>
                <input type="text" placeholder="Password" className="border-b-2 border-red-600 w-1/3 mt-6 text-xl"/>
                <input type="text" placeholder="Confirm Password" className="border-b-2 border-red-600 w-1/3 mt-6 text-xl"/>
                <div className="mt-6 flex flex-row w-1/3 items-center">
                    <input id="admin" type="checkbox" className="appearance-none cursor-pointer w-5 h-5 border-2 border-red-600"/>
                    <label for="admin" className="ml-2">Admin Access</label>
                </div>
                <button className="bg-red-600 text-white mt-6 text-2xl pt-1 pb-1.5 px-56 rounded-xl">Sign up</button>
                <div className="mt-5">Already have an account? <a href="/login" className="font-bold">Sign in</a></div>
            </div>
            <Image
                src={quarterCircle}
                alt="quarter circle"
                className="fixed bottom-0"
                width={180}
                height={180}
                blurDataURL="data:..."/>
            <div className="fixed bottom-0 flex flex-col items-center w-full py-4 text-sm text-gray-600">
                <div>Made by Team Cheetah</div>
                <div>2023 BOG Developer Bootcamp</div>
            </div>
        </>
    )
}6