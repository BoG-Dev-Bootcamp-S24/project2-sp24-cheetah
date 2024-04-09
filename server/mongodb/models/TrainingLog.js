
import mongoose from 'mongoose'

const trainingLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    animalId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    hours: { 
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    note: String,
    animalName: String,
    breed: String,
    userName: String
});

export default mongoose.models?.TrainingLog || mongoose.model("TrainingLog", trainingLogSchema);