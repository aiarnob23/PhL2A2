import OrderT from "./orders.interface";
import { OrderModel } from "./orders.model"
 type orderQueryT = string | null;

const postOrder = async(orderInfo : OrderT) =>{
    const result = await OrderModel.create(orderInfo);
    return result;
}

const findOders = async(email : orderQueryT)=>{
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
}