"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productControllers = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = __importDefault(require("./product.validation"));
//insert a new product
const insertProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = req.body;
        const validationResult = product_validation_1.default.parse(newProduct);
        const result = yield product_service_1.productServices.addNewProduct(validationResult);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
});
//get products
const allProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if ((_a = req.query) === null || _a === void 0 ? void 0 : _a.searchTerm) {
            const result = yield product_service_1.productServices.getAllProducts(req.query.searchTerm);
            res.status(200).json({
                success: true,
                message: "Products found successfully!",
                data: result,
            });
        }
        else {
            const result = yield product_service_1.productServices.getAllProducts(null);
            res.status(200).json({
                success: true,
                message: "Products fetched successfully!",
                data: result,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
});
//get product by id
const getSingleProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.productServices.getProductById(req.params.productId);
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
});
//update product
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validationResult = product_validation_1.default.safeParse(req.body);
        if (validationResult.data) {
            const result = yield product_service_1.productServices.updateProductById(req.params.productId, validationResult.data);
            res.status(200).json({
                success: true,
                message: "Product updated successfully!",
                data: result,
            });
        }
        else {
            res.json({
                error: validationResult.error,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
});
//delete product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.productServices.deleteProductById(req.params.productId);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
});
exports.productControllers = {
    insertProduct,
    allProducts,
    getSingleProducts,
    updateProduct,
    deleteProduct,
};
