import connectDB from "../..";
import Animal from "../../models/Animal";
import TrainingLog from "../../models/TrainingLog";

export default async function deleteAnimal(data) {
    try {
        await connectDB();
        await Animal.findByIdAndDelete(data?.animalId);
        const logs = await TrainingLog.find({"animalId" : data.animalId})
        logs.forEach(async (log) => await TrainingLog.findByIdAndDelete(log._id));
        return true;
    } catch (e) {
        console.log(e);
        return false;
        throw e;
    }
}