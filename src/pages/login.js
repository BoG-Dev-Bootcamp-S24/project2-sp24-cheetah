import Image from "next/image"
import quarterCircle from "../../public/images/quarterCircle.png"
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/components/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [id, setId] = useState(null);
    const [admin, setAdmin] = useState(false);
    const [name, setName] = useState("");
    const [failed, setFailed] = useState(false);
    const { contextLogin, contextName, contextId } = useContext(AuthContext);

    async function login() {
        const res = await fetch("api/user/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
        let verify = await res.json();
        setAdmin(verify.admin);
        setName(verify.fullName);
        if (res.status === 200) {
            let users = null;
            try {
                let usersRes = await fetch("/api/admin/users", {
                  method: "GET"
                })
                users = await usersRes.json();
            } catch (e) {
                console.error(e.message);
                trainingLogs = [];
            }
            setId(users.filter((user) => user.email === email)[0]._id);
        } else {
            setFailed(true);
        }
    }

    useEffect(() => {
        if (id) {
            contextLogin(name, id, admin);
            window.location.href = "/";
        }
    }, [id])

    return (
        <>
            <div className="border-b-8">top bar</div>
            <div className="flex flex-col items-center">
                <div className="text-5xl font-bold mt-40">Login</div>
                <input type="text" placeholder="Email" className="border-b-2 border-red-600 w-1/3 mt-8 text-xl"
                    onChange={(e) => setEmail(e.target.value)}/>
                <input type="text" placeholder="Password" className="border-b-2 border-red-600 w-1/3 mt-6 text-xl"
                    onChange={(e) => setPassword(e.target.value)}/>
                {failed ? <div className="h-0.5">Login Failed</div> : <div className="h-0.5"></div>}
                <button className="bg-red-600 text-white mt-12 text-2xl pt-1 pb-1.5 px-56 rounded-xl"
                    onClick={login}>Log In</button>
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