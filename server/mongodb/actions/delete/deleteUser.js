import connectDB from "../..";
import Animal from "../../models/Animal";
import TrainingLog from "../../models/TrainingLog";
import User from "../../models/User";

export default async function deleteUser(data) {
    try {
        await connectDB();
        await User.findByIdAndDelete(data?.userId);
        const logs = await TrainingLog.find({"userId" : data.userId})
        logs.forEach(async (log) => await TrainingLog.findByIdAndDelete(log._id));
        const animals = await Animal.find({"ownerId" : data.userId})
        animals.forEach(async (animal) => await Animal.findByIdAndDelete(animal._id));
        return true;
    } catch (e) {
        console.log(e);
        return false;
        throw e;
    }
}