import connectDB from "../..";
import Animal from "../../models/Animal";
import TrainingLog from "../../models/TrainingLog";
import updateAnimalHours from "./updateAnimalHours";

export default async function updateTraining(data) {
    try {
        await connectDB();
        const { trainingLogId, userId, title, animalId, hours, date, note } = data;
        if (!trainingLogId) {
            const e = new Error("Training Log ID required");
            e.name = "InvalidParametersError";
            throw e;
        }
        if (!userId || !animalId || !title || !date || !note || !hours) {
            const e = new Error("All training log data required")
            e.name = "InvalidParametersError";
            throw e;
        }
        let checkTrainingLog = await TrainingLog.findById(trainingLogId);
        if (!checkTrainingLog) {
            const e = new Error("Training Log Not Found");
            e.name = "TrainingLogNotFoundError";
            throw e;
        }
        let prevHours = checkTrainingLog.hours;
        const animal = await Animal.findById(animalId);
        await TrainingLog.findByIdAndUpdate(trainingLogId, { userId: userId,
                                                                animalId: animalId,
                                                                title: title,
                                                                date: date,
                                                                note: note,
                                                                hours: hours } );
        await updateAnimalHours({ animalId: animalId,
                                    hours: animal.hoursTrained + hours - prevHours});
        return true;
    } catch (e) {
        //console.log(e);
        throw e;
    }
}