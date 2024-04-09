import Image from "next/image"
import quarterCircle from "../../public/images/quarterCircle.png"
import { useState } from "react";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [diffPass, setDiffPass] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [error, setError] = useState(false);

    async function createAccount() {
        if (password !== confirmPassword) {
            setDiffPass(true);
            return;
        }
        let res = await fetch("/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "fullName": name,
                "email": email,
                "password": password,
                "admin": admin
            })
        })
        if (res.status === 200) {
            window.location.href = "/login";
        } else {
            setError(true);
        }
    }

    return (
        <>
            <div className="border-b-8">top bar</div>
            <div className="flex flex-col items-center">
                <div className="text-5xl font-bold mt-20">Create Account</div>
                <input type="text" placeholder="Full Name" className="border-b-2 border-red-600 w-1/3 mt-8 text-xl"
                    onChange={e => setName(e.target.value)}/>
                <input type="text" placeholder="Email" className="border-b-2 border-red-600 w-1/3 mt-6 text-xl"
                    onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" className="border-b-2 border-red-600 w-1/3 mt-6 text-xl"
                    onChange={e => setPassword(e.target.value)}/>
                <input type="password" placeholder="Confirm Password" className="border-b-2 border-red-600 w-1/3 mt-6 text-xl"
                    onChange={e => setConfirmPassword(e.target.value)}/>
                {diffPass ? <div className="h-1 w-1/3 text-xs">Passwords do not match</div> : <div className="h-1"></div>}
                <div className="mt-6 flex flex-row w-1/3 items-center">
                    <input id="admin" type="checkbox" className="appearance-none cursor-pointer w-5 h-5 border-2 border-red-600
                        checked:bg-red-600" onChange={e => {
                            if (e.target.value === "on") setAdmin(true);
                            else setAdmin(false);
                        }}/>
                    <label for="admin" className="ml-2 cursor-pointer">Admin Access</label>
                </div>
                {error ? <div className="h-0.5">Error creating account</div> : <div className="h-0.5"></div>}
                <button className="bg-red-600 text-white mt-6 text-2xl pt-1 pb-1.5 px-56 rounded-xl"
                    onClick={createAccount}>Sign up</button>
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