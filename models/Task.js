import mongoose from "mongoose";

const Schema = mongoose.Schema;
const taskShema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    status:String,
    date:Date
},{timestamps:true})

const Task = mongoose.model('task',taskShema);
export default Task;