import connectDB from "../..";
import User from "../../models/User";

export default async function createUser(data) {
    try {
        await connectDB();
        const checkEmail = User.find({ email: data.email });
        if (checkEmail) {
            const e = new Error("Email already in use");
            e.name = "InvalidParametersError";
            throw e;
        }
        const user = new User(data);
        await user.save();
        return true;
    } catch (e) {
        console.log(e);
        throw e;
    }
}