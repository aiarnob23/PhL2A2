import { productModel } from "../product/product.model";
import OrderT from "./orders.interface";
import { OrderModel } from "./orders.model";

const postOrder = async (orderInfo: OrderT) => {
    // Find the product by ID and get its quantity
    const product = await productModel.findOne(
        { _id: orderInfo.productId },
        { "inventory.quantity": 1, "inventory.inStock": 1 }
    );

    if (!product) {
        return {success:false, message:"Prodcut not found, check the product id again"};
    }

    const availableQuantity = product.inventory.quantity;

    if (orderInfo.quantity > availableQuantity) {
        return { success: false, message: 'Insufficient quantity available in inventory' };
    }

    if(orderInfo.quantity==availableQuantity){
        const result = await OrderModel.create(orderInfo);
        await productModel.updateOne({_id:orderInfo.productId}, {$set : {"inventory.quantity":0, "inventory.inStock":false}});
        return {success:true, result}
    }

    const newQuantity = availableQuantity - orderInfo.quantity;
    const result = await OrderModel.create(orderInfo);
    await productModel.updateOne({_id:orderInfo.productId}, {$set : {"inventory.quantity":newQuantity}});
    return {success:true, result}
};
//retrive orders
const findOders = async(email : string | null)=>{
    if(email){
        const result = await OrderModel.find({email:email});
        return result;
    }
    else{
        const result = await OrderModel.find();
        return result;
    }
}



export const orderServices = {
    postOrder,
    findOders,
};

