import { model, Schema } from "mongoose";
import productT from "./product.interface";

const productSchema = new Schema<productT>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: {
    type: [
      {
        type: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    required: true,
  },
  inventory: {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
});

export const productModel = model<productT>("Products", productSchema);
