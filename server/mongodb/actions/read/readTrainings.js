import connectDB from "../..";
import TrainingLog from "../../models/TrainingLog";

export default async function readTrainings() {
    try {
        await connectDB();
        let res = await TrainingLog.find();
        return res;
    } catch (e) {
        console.log(e);
        throw e;
    }
}