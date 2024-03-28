import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    fullName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    admin : {
        type : Boolean,
        required : true
    }
});

export default mongoose.model("User", userSchema);