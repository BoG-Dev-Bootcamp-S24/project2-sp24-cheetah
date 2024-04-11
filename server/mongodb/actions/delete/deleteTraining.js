import connectDB from "../..";
import TrainingLog from "../../models/TrainingLog";

export default async function deleteTraining(data) {
    try {
        await connectDB();
        await TrainingLog.findByIdAndDelete(data?.trainingLogId);
        return true;
    } catch (e) {
        console.log(e);
        return false;
        throw e;
    }
}