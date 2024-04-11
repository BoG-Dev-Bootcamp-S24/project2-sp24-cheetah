import connectDB from "../..";
import Animal from "../../models/Animal";
import TrainingLog from "../../models/TrainingLog";
import updateAnimalHours from "./updateAnimalHours";

export default async function updateTraining(data) {
    try {
        await connectDB();
        const { trainingLogId, note, hours } = data;
        if (!trainingLogId) {
            const e = new Error("Training Log ID required");
            e.name = "InvalidParametersError";
            throw e;
        }
        if (!note || !hours) {
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
        const animal = await Animal.findById(checkTrainingLog.animalId);
        await TrainingLog.findByIdAndUpdate(trainingLogId, { note: note,
                                                                hours: hours } );
        await updateAnimalHours({ animalId: checkTrainingLog.animalId,
                                    hours: animal.hoursTrained + parseInt(hours) - prevHours});
        return true;
    } catch (e) {
        console.log(e);
        throw e;
    }
}