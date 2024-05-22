import { z } from "zod";

    //schema validation using zod
     const productValidationSchema = z.object({
        name: z.string({message:"must be a string"}).min(1,{message:"minimum 1 char is required"}).max(255),
        description: z.string().min(1),
        price: z.number({message:"price can't be string"}).min(0),
        category: z.string({message:"must be string"}).min(1),
        tags: z.array(z.string()),
        variants: z.array(
            z.object({
                type: z.string().min(1),
                value: z.string().min(1)
            })
        ),
        inventory: z.object({
            quantity: z.number().min(0),
            inStock: z.boolean()
        })
    })


    export default productValidationSchema;