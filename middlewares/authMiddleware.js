import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected route token base
export const requireSignIn = async(req,res,next) =>{

        //after req and next only res is executed
        //token is stored in req.header.authorization

        try {
            console.log(req.headers.authorization)
            const decode = JWT.verify(req.headers.authorization,process.env.JWT_SECRET)
            req.user = decode;//remember to pass the decode otherwise we would not be able to use id
            next();
        } catch (error) {
            console.log(error)
        }

}

//admin access,to check if it is admin
export const isAdmin = async (req,res,next)=>{

    try {
        const user = await userModel.findById(req.user._id);

        if(user.role !==1){

            return res.send(401).send({
                success : false,
                message : 'Unauthorized access'
            })
        }
        else{
            next(); //user is admin and so we continue with next() actions
        }

    } catch (error) {
        console.log(error)
        res.status(401).send("Error in admin middleware")
    }
}