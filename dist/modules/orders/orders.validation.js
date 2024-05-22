"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string({ message: "must be string type" }).email(),
    productId: zod_1.z.string({ message: "must be a standard object id" }),
    price: zod_1.z.number({ message: "price must be number type" }),
    quantity: zod_1.z.number({ message: "quantity must be number type" }),
});
exports.default = orderValidationSchema;
