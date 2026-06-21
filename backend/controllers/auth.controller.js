import { useSyncExternalStore } from "react";
import User from "../models/user.model.js";
import { bcrypt } from "bcryptjs"
import generateToken from "../config/token.js";

export const signUp = async (req, res) => {
    try {
        const { name, email, password, userName } = req.body;
        const findByEmail = await User.findOne({ email })
        if (findByEmail) {
            return res.status(400).json({ message: "Email already exist !..." })
        }

        const findByUserName = await User.findOne({ userName })
        if (findByUserName) {
            return res.status(400).json({ message: "password must be 6 character !..." })
        }

         if (password.length<6) {
            return res.status(400).json({ message: "Email already exist !..." })
        }
         

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            userName,
            email,
            password: hashedPassword
        })

        
        const token =await generateToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure:false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        return res.status(201).json(user)
    }
    catch (error) {
        return res.status(500).json({message:`signup error ${error}`})
    }
}


export const signIn= async (req, res) => {
    try {
        const { password, userName } = req.body;

        const user= await User.findOne({ userName })
        if (!user) {
            return res.status(400).json({ message: "user not faund !..." })
        }

        const isMatch = await bcrypt.compare(password, user.passsword)

        if(!isMatch){
             return res.status(400).json({ message: "incorrect password." })
        }

        const user = await User.create({
            name,
            userName,
            email,
            password: hashedPassword
        })

        
        const token =await generateToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure:false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        return res.status(201).json(user)
    }
    catch (error) {
        return res.status(500).json({message:`signIn error ${error}`})
    }
}



export default  signOut=async(req,res)=>{
    try{
        res.clearCookie("token")
         return res.status(500).json({message:`signOut successfully`})
    }
    catch(error){
         return res.status(500).json({message:`signOut error ${error}`})
    }
}