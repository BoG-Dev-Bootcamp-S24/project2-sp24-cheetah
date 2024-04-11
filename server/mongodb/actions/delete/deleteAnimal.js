import connectDB from "../..";
import Animal from "../../models/Animal";

export default async function deleteAnimal(data) {
    try {
        await connectDB();
        console.log(findById(data?.ownerId));
        await Animal.findByIdAndDelete(data?.ownerId);
        return true;
    } catch (e) {
        console.log(e);
        return false;
        throw e;
    }
}