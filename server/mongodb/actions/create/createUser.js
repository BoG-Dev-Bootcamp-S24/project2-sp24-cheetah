import connectDB from "../..";
import User from "../../models/User";

export default async function createUser(data) {
    try {
        await connectDB();
        const checkEmail = await User.find({ email: data.email });
        if (!checkEmail) {
            const e = new Error("Email already in use");
            e.name = "InvalidParametersError";
            throw e;
        }
        var bcrypt = require('bcryptjs');
        var salt = bcrypt.genSaltSync();
        var hash = bcrypt.hashSync(data.password, salt);
        data = {fullName: data.fullName,
                    email: data.email,
                    admin: data.admin,
                    password: hash }
        const user = new User(data);
        await user.save();
        return true;
    } catch (e) {
        console.log(e);
        throw e;
    }
}