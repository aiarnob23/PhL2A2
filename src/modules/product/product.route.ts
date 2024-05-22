import express from 'express';
import { productControllers } from './product.controller';

const router = express.Router();

router.post('/', productControllers.insertProduct);
router.get('/',productControllers.allProducts);
router.get('/:productId', productControllers.getSingleProducts);
router.delete('/:productId', productControllers.deleteProduct);
router.put('/:productId', productControllers.updateProduct);

export const productRoutes = router;