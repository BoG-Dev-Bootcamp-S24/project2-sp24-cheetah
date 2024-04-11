import connectDB from "../..";
import User from "../../models/User";

export default async function deleteUser(data) {
    try {
        await connectDB();
        console.log(findById(data?.userId));
        await User.findByIdAndDelete(data?.userId);
        return true;
    } catch (e) {
        console.log(e);
        return false;
        throw e;
    }
}