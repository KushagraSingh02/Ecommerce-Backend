import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
export const createCategoryController = async (req,res)=>{

    try {
        const {name} = req.body;
        if(!name){
            res.status(401).send({message:"Name is required here"})
        }
        const existingCategory = await categoryModel.findOne({name});

        if(existingCategory){

            res.status(200).send({
                success:true,
                message:"found category"
            })
        }

        const category = await new categoryModel({name,slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:"new category is created",
            category
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:true,
            message : "Internal in category present"
        })
    }
};