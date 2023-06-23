import { ClientSession } from "mongodb";
import  {comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req,res) =>{

    try {
        
        const {name,email,password,phone,address,answer} = req.body
        //validaitons

        if(!name){

            res.send({error:'Name is required'})
        }
        if(!email){

            res.send({error:'email is required'})
        }
        if(!password){

            res.send({error:'password is required'})
        }
        if(!phone){

            res.send({error:'phone is required'})
        }
        if(!address){

            res.send({error:'address is required'})
        }
        if(!answer){

            res.send({error:'answer is required input'})
        }

        //check user
        const existinguser = await userModel.findOne({email});

        //existing user
        if(existinguser){

            return res.status(200).send({
                success:true,
                message:"Already Register please login"
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)

        //save
        const user = new userModel({name,email,phone,address,password:hashedPassword,answer}).save()

        res.status(200).send({
            success:true,
            message:"Registration successful",
            user
        })


    } catch (error) {
        console.log(error);

        res.status(500).send({
            success:false,
            message:'Error in registration',
            error
        })
    }

};

// export default {registercontroller};


export const loginController = async (req,res) =>{
    try {
        
        const {email,password} = req.body;
        
        //validation
        if(!email || !password){

            res.status(404).send({
                success:false,
            message:'Invalid email or password',
            })
        }
        
        //check user
        const user = await userModel.findOne({email})
        // console.log(user)
        if(!user){
            return res.status(404).send({
                success : false,
                message : 'Email is not registered',
            })
        }

        

        const match = await comparePassword(password,user.password)
        // console.log(match)
        if(!match){

            return res.status(200).send({
                success:false,
                message:'Invalid Password',
            })
        }

        //Create token after all conditions are checked 
        const token = await JWT.sign({_id: user._id},process.env.JWT_SECRET,{
            expiresIn : "7d",
        });
        res.status(200).send({

            success:true,
            message:"login successfully",
            user : {
                name : user.name, 
                email : user.email,
                phone: user.phone,
                address : user.address
            },
            token,
        });
         
    } catch (error) {
        console.log(error)
        res.send({
            success:false,
            message:'Login did not happen',
            error
        })
    }

};

//Forgot PassswordController
export const forgotPasswordController = async (req,res) =>{
    try {
        
        const {email,answer,newPassword} = req.body;

        
        if(!email){
            return res.status(404).send({
                success : false,
                message : 'Email is definitely registered',
            })
        }
        if(!answer){
            return res.status(404).send({
                success : false,
                message : 'answer is mandatorily required',
            })
        }  if(!newPassword){
            return res.status(404).send({
                success : false,
                message : 'New Password is required',
            })
        }

        //check if email and answer are right 

        const user = await userModel.findOne({email,answer})

        if(!user){

            return res.status(404).send({
                success : false,
                message:'Somethind went wrong here',
                error
            })
        }

        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id,{password:hashed})

        res.status(200).send({
            success : true,
            message:'password updated'
        });

    } catch (error) {
        console.log(error)
        res.send(500).send({
            success:true,
            message:"Something went wrong here",
            error
        })
    }
}