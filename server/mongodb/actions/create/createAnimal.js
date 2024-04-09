import connectDB from "../..";
import Animal from "../../models/Animal";
import User from "../../models/User";

export default async function createAnimal(data) {
    try {
        await connectDB();
        const user = User.findById(data.userId);
        data = {
            ...data,
            userName : user.fullName
        }
        const animal = new Animal(data);
        console.log(animal);
        await animal.save();
        return true;
    } catch (e) {
        console.log(e);
        throw e;
    }
}