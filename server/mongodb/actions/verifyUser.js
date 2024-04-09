import connectDB from "..";
import User from "../models/User";

export default async function verifyUser(data) {
    try {
        await connectDB();
        const { email, password } = data;
        if (!email) {
            const e = new Error("Email not provided");
            e.name = "InvalidParametersError";
            throw e;
        }
        if (!password) {
            const e = new Error("Password not provided");
            e.name = "InvalidParametersError";
            throw e;
        }
        const user = await User.find({ email: email });
        if (!user[0]) {
            const e = new Error("User with this email not found");
            e.name = "InvalidParametersError";
            throw e;
        }
        if (user[0].password !== password) {
            const e = new Error("User password incorrect");
            e.name = "InvalidParametersError";
            throw e;
        }
        return { fullName: user[0].fullName, 
                    admin: user[0].admin };
    } catch (e) {
        console.log(e);
        throw e;
    }
}