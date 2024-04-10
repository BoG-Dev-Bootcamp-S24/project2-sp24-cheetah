import connectDB from "../..";
import User from "../../models/User";

export default async function readUsers() {
    try {
        await connectDB();
        let res = await User.find();
        let withoutpw = []
        res.map((user) => {
            withoutpw.push({ _id: user._id,
                                fullName: user.fullName,
                                email: user.email,
                                admin: user.admin });
        })
        return withoutpw;
    } catch (e) {
        console.log(e);
        throw e;
    }
}