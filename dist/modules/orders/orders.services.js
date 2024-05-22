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
exports.orderServices = void 0;
const product_model_1 = require("../product/product.model");
const orders_model_1 = require("./orders.model");
const postOrder = (orderInfo) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the product by ID and get its quantity
    const product = yield product_model_1.productModel.findOne({ _id: orderInfo.productId }, { "inventory.quantity": 1, "inventory.inStock": 1 });
    if (!product) {
        return { success: false, message: "Prodcut not found, check the product id again" };
    }
    const availableQuantity = product.inventory.quantity;
    if (orderInfo.quantity > availableQuantity) {
        return { success: false, message: 'Insufficient quantity available in inventory' };
    }
    if (orderInfo.quantity == availableQuantity) {
        const result = yield orders_model_1.OrderModel.create(orderInfo);
        yield product_model_1.productModel.updateOne({ _id: orderInfo.productId }, { $set: { "inventory.quantity": 0, "inventory.inStock": false } });
        return { success: true, result };
    }
    const newQuantity = availableQuantity - orderInfo.quantity;
    const result = yield orders_model_1.OrderModel.create(orderInfo);
    yield product_model_1.productModel.updateOne({ _id: orderInfo.productId }, { $set: { "inventory.quantity": newQuantity } });
    return { success: true, result };
});
//retrive orders
const findOders = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        const result = yield orders_model_1.OrderModel.find({ email: email });
        return result;
    }
    else {
        const result = yield orders_model_1.OrderModel.find();
        return result;
    }
});
exports.orderServices = {
    postOrder,
    findOders,
};
