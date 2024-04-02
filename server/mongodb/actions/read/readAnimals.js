import connectDB from "../..";
import Animal from "../../models/Animal";

export default async function readAnimals() {
    try {
        await connectDB();
        let res = await Animal.find();
        return res;
    } catch (e) {
        console.log(e);
        throw e;
    }
}