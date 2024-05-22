import { Request, Response } from "express";
import { orderServices } from "./orders.services";
import OrderT from "./orders.interface";
import orderValidationSchema from "./orders.validation";

type ServiceResponse = {
  success?: boolean;
  message?: string;
  data?: OrderT;
};

//insert order
const insertOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = req.body;
    const validationResult = orderValidationSchema.parse(newOrder);
    const result: ServiceResponse | any =
      await orderServices.postOrder(validationResult);

    if (result.success) {
      res.status(200).json({
        success: true,
        message: "Order created successfully!",
        data: result,
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please check the information again!",
    });
  }
};
//get orders
const getOders = async (req: Request, res: Response) => {
  try {
    if (req.query.email) {
      const result = await orderServices.findOders(req.query.email as string);
      if (result.length) {
        res.status(200).json({
          success: true,
          message: "Orders fetched successfully for user email",
          data: result,
        });
      } else {
        res.json({
          success: false,
          message: "Order not found",
        });
      }
    } else {
      const result = await orderServices.findOders(null);
      res.status(200).json({
        success: true,
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

export const orderControllers = {
  insertOrder,
  getOders,
};
