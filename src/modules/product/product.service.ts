
import productT from "./product.interface";
import { productModel } from "./product.model";

type searchTerm = string | null;

//add new product 
const addNewProduct = async (product: productT) => {
    const result = await productModel.create(product);
    return result;
}
//get products
const getAllProducts = async (searchTerm: searchTerm) => {
    if (searchTerm) {
        const regex = new RegExp(searchTerm, "i");
        const result = await productModel.find({
            $or: [
                { name: { $regex: regex } },
                { description: { $regex: regex } },
                { category: { $regex: regex } },
                { tags: { $in: [regex] } }
            ]
        })
        return result;
    }
    else {
        const result = await productModel.find();
        return result;
    }
}
//get product by id
const getProductById = async (productId: string) => {
    const result = await productModel.find({ _id: productId });
    return result;
}
//update product by id
const updateProductById = async(productId:string, updatedInfo:productT)=>{
    const result = await productModel.replaceOne({_id:productId}, updatedInfo);
    if(result.modifiedCount){
        const updatedProduct = await productModel.find({_id:productId});
        return updatedProduct; 
    }
}
//delete a product
const deleteProductById = async (productId: string) => {
    const result = await productModel.findByIdAndDelete(productId);
    return result;
}




export const productServices = {
    addNewProduct,
    getAllProducts,
    getProductById,
    deleteProductById,
    updateProductById,
}