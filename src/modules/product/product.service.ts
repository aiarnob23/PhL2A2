
import productT from "./product.interface";
import { productModel } from "./product.model";


const addNewProduct = async(product: productT) =>{
    const result = await productModel.create(product);
    return result;
}

const getAllProducts = async()=>{
    const result = await productModel.find();
    return result;
}

const getProductById = async(productId:string)=>{
    const result = await productModel.find({_id:productId});
    return result;
}

const deleteProductById = async(productId:string)=>{
    const result =await productModel.findByIdAndDelete(productId);
    return result;
}

export const productServices = {
    addNewProduct,
    getAllProducts,
    getProductById,
    deleteProductById,
}