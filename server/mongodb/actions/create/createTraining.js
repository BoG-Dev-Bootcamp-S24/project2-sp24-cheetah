import connectDB from "../..";
import Animal from "../../models/Animal";
import TrainingLog from "../../models/TrainingLog";
import User from "../../models/User";
import updateAnimalHours from "../update/updateAnimalHours";

export default async function createTraining(data) {
    try {
        await connectDB();
        const animal = await Animal.findById(data.animalId);
        const user = await User.findById(data.userId);
        data = {
            ...data,
            "animalName": animal.name,
            "breed": animal.breed,
            "userName": user.fullName
        }
        const training = new TrainingLog(data);
        await training.save();
        await updateAnimalHours({ animalId: training.animalId, 
                                    hours: animal.hoursTrained + training.hours });
        return true;
    } catch (e) {
        console.log(e);
        throw e;
    }
}