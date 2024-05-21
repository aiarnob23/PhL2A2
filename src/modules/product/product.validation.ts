import { z } from "zod";

    //schema validation using zod
     const productValidationSchema = z.object({
        name: z.string({message:"must be a string"}).min(1).max(255),
        description: z.string().min(1),
        price: z.number().min(0),
        category: z.string().min(1),
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