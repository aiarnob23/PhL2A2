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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productControllers = void 0;
const product_service_1 = require("./product.service");
const zod_1 = require("zod");
const insertProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //schema validation using zod
        const productValidationSchema = ({
            name: zod_1.z.string().min(1).max(255),
            description: zod_1.z.string().min(1),
            price: zod_1.z.number().min(0),
            category: zod_1.z.string().min(1),
            tags: zod_1.z.array(zod_1.z.string()),
            variants: zod_1.z.array(zod_1.z.object({
                type: zod_1.z.string().min(1),
                value: zod_1.z.string().min(1)
            })),
            inventory: zod_1.z.object({
                quantity: zod_1.z.number().min(0),
                inStock: zod_1.z.boolean()
            })
        });
        const result = yield product_service_1.productServices.addNewProduct(req.body);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
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
    }
});
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
    }
});
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
    }
});
exports.productControllers = {
    insertProduct,
    allProducts,
    getSingleProducts,
    deleteProduct,
};
