import { z } from "zod";

const orderValidationSchema = z.object({
    email: z.string({message:"must be string type"}).email(),
    productId: z.string({message:"must be a standard object id"}), 
    price: z.number({message:"price must be number type"}), 
    quantity: z.number({message:"quantity must be number type"}), 
  });
  
export default orderValidationSchema;