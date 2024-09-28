import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/testapp1')

const userSchema = mongoose.Schema({
   image:String,
    name:String,
   email:String,

})

export default mongoose.model('User',userSchema)