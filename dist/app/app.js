"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("../modules/product/product.route");
app.use(express.json());
app.use((0, cors_1.default)());
//app routes
app.use('/api/products', product_route_1.productRoutes);
app.get('/', (req, res) => {
    res.send('E Commerce Server!');
});
exports.default = app;