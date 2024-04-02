import connectDB from "../..";
import User from "../../models/User";

export default async function createUser(data) {
    try {
        await connectDB();
        const user = new User(data);
        await user.save();
        return true;
    } catch (e) {
        console.log(e);
        throw e;
    }
}