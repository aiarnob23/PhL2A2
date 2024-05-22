"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
//schema validation using zod
const productValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string({ message: "must be a string" })
        .min(1, { message: "minimum 1 char is required" })
        .max(255),
    description: zod_1.z.string().min(1),
    price: zod_1.z.number({ message: "price can't be string" }).min(0),
    category: zod_1.z.string({ message: "must be string" }).min(1),
    tags: zod_1.z.array(zod_1.z.string()),
    variants: zod_1.z.array(zod_1.z.object({
        type: zod_1.z.string().min(1),
        value: zod_1.z.string().min(1),
    })),
    inventory: zod_1.z.object({
        quantity: zod_1.z.number().min(0),
        inStock: zod_1.z.boolean(),
    }),
});
exports.default = productValidationSchema;
