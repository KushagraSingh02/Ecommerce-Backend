import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
   //slug converts spaces between words in uniform resource locater to dashes

    slug:{
        type : String,
        lowercase:true,

    }  
})

export default mongoose.model ('Categories',categorySchema);