import { Request, Response } from "express";
import { productServices } from "./product.service";



const insertProduct = async(req:Request, res:Response)=>{
    try{
        const result = await productServices.addNewProduct(req.body);
        res.status(200).json({
            success:true,
            data:result,
        })
    }
    catch(error){
        console.log(error);
    }
}

const allProducts = async(req:Request, res:Response)=>{
    try{
        const result = await productServices.getAllProducts();
        res.status(200).json({
            success:true,
            message:"Products fetched successfully!",
            data:result,
        })
    }
    catch(error){
        console.log(error);
    }
}

const getSingleProducts = async(req:Request, res:Response)=>{
    try{
        const result = await productServices.getProductById(req.params.productId);
        res.status(200).json({
            success:true,
            message:"Products fetched successfully!",
            data:result,
        })
    }
    catch(error){
        console.log(error);
    }
}

const deleteProduct = async(req:Request, res:Response)=>{
    try{
        const result = await productServices.deleteProductById(req.params.productId);
        res.status(200).json({
            success:true,
            message:"Product deleted successfully!",
            data: null,
        })
    }
    catch(error){
        console.log(error);
    }
}

export const productControllers = {
    insertProduct,
    allProducts,
    getSingleProducts,
    deleteProduct,
}