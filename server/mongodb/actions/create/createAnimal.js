import connectDB from "../..";
import Animal from "../../models/Animal";

export default async function createAnimal(data) {
    try {
        await connectDB();
        const animal = new Animal(data);
        console.log(animal);
        await animal.save();
        return true;
    } catch (e) {
        console.log(e);
        throw e;
    }
}