import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        requeired:true
    },
    userName:{
        type:String,
        requeired:true,
        unique:true
    },
     email:{
        type:String,
        requeired:true,
        unique:true
    },
     email:{
        type:String,
        requeired:true,
    },
     profileImage:{
        type:String,
    },
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
     following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ],
       saved:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ]

},{timestamps:true})

const User=mongoose.model("User",userSchema)
export default User