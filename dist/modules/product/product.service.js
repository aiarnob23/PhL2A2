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
exports.productServices = void 0;
const product_model_1 = require("./product.model");
const addNewProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.productModel.create(product);
    return result;
});
const getAllProducts = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    if (searchTerm) {
        const regex = new RegExp(searchTerm, "i");
        const result = yield product_model_1.productModel.find({
            $or: [
                { name: { $regex: regex } },
                { description: { $regex: regex } },
                { category: { $regex: regex } },
                { tags: { $in: [regex] } }
            ]
        });
        return result;
    }
    else {
        const result = yield product_model_1.productModel.find();
        return result;
    }
});
const getProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.productModel.find({ _id: productId });
    return result;
});
const deleteProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.productModel.findByIdAndDelete(productId);
    return result;
});
const updateProductById = (productId, updatedInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.productModel.replaceOne({ _id: productId }, updatedInfo);
    return result;
});
exports.productServices = {
    addNewProduct,
    getAllProducts,
    getProductById,
    deleteProductById,
    updateProductById,
};
