import connectDB from "../..";
import Animal from "../../models/Animal";
import TrainingLog from "../../models/TrainingLog";
import updateAnimalHours from "../update/updateAnimalHours";

export default async function createTraining(data) {
    try {
        await connectDB();
        const training = new TrainingLog(data);
        await training.save();
        const animal = await Animal.findById(training.animalId);
        await updateAnimalHours({ animalId: training.animalId, 
                                    hours: animal.hoursTrained + training.hours });
        return true;
    } catch (e) {
        console.log(e);
        throw e;
    }
}