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
exports.orderControllers = void 0;
const orders_services_1 = require("./orders.services");
const insertOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield orders_services_1.orderServices.postOrder(req.body);
        if (result.success) {
            res.status(200).json({
                success: true,
                data: result,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: result.message,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Please check the information again!',
        });
    }
});
const getOders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.query.email) {
            const result = yield orders_services_1.orderServices.findOders(req.query.email);
            res.status(200).json({
                success: true,
                data: result,
            });
        }
        else {
            const result = yield orders_services_1.orderServices.findOders(null);
            res.status(200).json({
                success: true,
                data: result,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.orderControllers = {
    insertOrder,
    getOders,
};
