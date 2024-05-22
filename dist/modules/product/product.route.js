"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.post('/', product_controller_1.productControllers.insertProduct);
router.get('/', product_controller_1.productControllers.allProducts);
router.get('/:productId', product_controller_1.productControllers.getSingleProducts);
router.delete('/:productId', product_controller_1.productControllers.deleteProduct);
router.put('/:productId', product_controller_1.productControllers.updateProduct);
exports.productRoutes = router;
