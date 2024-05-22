import { Request, Response } from "express";
import { productServices } from "./product.service";
import productValidationSchema from "./product.validation";


//insert a new product
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
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        })
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
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        })
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
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        })
    }
}

//update product
const updateProduct = async (req: Request, res: Response) => {
    try {
        const validationResult = productValidationSchema.safeParse(req.body);
        if (validationResult.data) {
            const result = await productServices.updateProductById(req.params.productId, validationResult.data);
            res.status(200).json({
                success: true,
                message: "Product updated successfully!",
                data: result,
            })
        }
        else {
            res.json({
                error: validationResult.error,
            })
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        })
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
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        })
    }
}





export const productControllers = {
    insertProduct,
    allProducts,
    getSingleProducts,
    updateProduct,
    deleteProduct,

}