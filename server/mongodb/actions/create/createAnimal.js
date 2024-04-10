import connectDB from "../..";
import Animal from "../../models/Animal";
import User from "../../models/User";

export default async function createAnimal(data) {
    try {
        await connectDB();
        const user = await User.findById(data.ownerId);
        data = {
            ...data,
            "userName" : user.fullName
        }
        const animal = new Animal(data);
        await animal.save();
        return true;
    } catch (e) {
        console.log(e);
        throw e;
    }
}