import { Request, Response } from "express";
import { productServices } from "./product.service";
import productValidationSchema from "./product.validation";


//insert a product
const insertProduct = async (req: Request, res: Response) => {
    try {
        const newProduct = req.body;
        const validationResult = productValidationSchema.parse(newProduct);
        const result = await productServices.addNewProduct(validationResult);
        res.status(200).json({
            success: true,
            data: result,
        })
    }
    catch (error) {
        console.log(error);
    }
}
//get products
const allProducts = async (req: Request, res: Response) => {
    try {
        if (req.query?.searchTerm) {
            const result = await productServices.getAllProducts(req.query.searchTerm as string);
            res.status(200).json({
                success: true,
                message: "Products found successfully!",
                data: result,

            })
        }
        else {
            const result = await productServices.getAllProducts(null);
            res.status(200).json({
                success: true,
                message: "Products fetched successfully!",
                data: result,
            })
        }
    }
    catch (error) {
        console.log(error);
    }
}
//get product by id
const getSingleProducts = async (req: Request, res: Response) => {
    try {
        const result = await productServices.getProductById(req.params.productId);
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
        })
    }
    catch (error) {
        console.log(error);
    }
}
//delete product
const deleteProduct = async (req: Request, res: Response) => {
    try {
        const result = await productServices.deleteProductById(req.params.productId);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null,
        })
    }
    catch (error) {
        console.log(error);
    }
}





export const productControllers = {
    insertProduct,
    allProducts,
    getSingleProducts,
    deleteProduct,
}