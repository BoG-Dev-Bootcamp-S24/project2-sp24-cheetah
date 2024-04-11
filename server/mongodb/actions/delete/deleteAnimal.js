import connectDB from "../..";
import Animal from "../../models/Animal";

export default async function deleteAnimal(data) {
    try {
        await connectDB();
        await Animal.findByIdAndDelete(data?.animalId);
        return true;
    } catch (e) {
        console.log(e);
        throw e;
    }
}