import connectDB from "../..";
import TrainingLog from "../../models/TrainingLog";

export default async function deleteTraining(data) {
    try {
        await connectDB();
        const training = await TrainingLog.findByIdAndDelete(data?.trainingLogId);
        const animal = await Animal.findById(training.animalId);
        await updateAnimalHours({ animalId: training.animalId, 
            hours: animal.hoursTrained - training.hours });
        return true;
    } catch (e) {
        console.log(e);
        return false;
        throw e;
    }
}