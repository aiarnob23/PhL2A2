"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./modules/product/product.route");
const orders_route_1 = require("./modules/orders/orders.route");
app.use(express.json());
app.use((0, cors_1.default)());
//app routes
app.use("/api/products", product_route_1.productRoutes);
app.use("/api/orders", orders_route_1.orderRoutes);
app.get("/", (req, res) => {
    res.json({
        message: "Server is running!"
    });
});
//error route handling function
app.use("*", (req, res) => {
    res.send({
        success: false,
        message: "Route not found",
    });
});
exports.default = app;
