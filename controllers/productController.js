import productModel from '../models/productModel.js';
import slugify from "slugify";
import fs from 'fs'; //file system being used 

export const createProductController= async (req,res)=>{

    try {
        
        const {name,description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files;

        //validation
        switch (true) {
            case !name:
              return res.status(500).send({ error: "Name is Required" });
            case !description:
              return res.status(500).send({ error: "Description is Required" });
            case !price:
              return res.status(500).send({ error: "Price is Required" });
            case !category:
              return res.status(500).send({ error: "Category is Required" });
            case !quantity:
              return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
              return res
                .status(500)
                .send({ error: "photo is Required and should be less then 1mb" });
          }

          

        const product = new productModel({...req.fields,slug:slugify(name)})

        if(photo){

            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }

        await product.save()

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'some error'
        })
    }
}