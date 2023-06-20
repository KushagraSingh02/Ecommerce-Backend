import  {hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

export const registerController = async (req,res) =>{

    try {
        
        const {name,email,password,phone,address} = req.body
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
        const user = new userModel({name,email,phone,address,password:hashedPassword}).save()

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