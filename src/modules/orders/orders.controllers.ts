import { Request, Response } from "express";
import { orderServices } from "./orders.services";
import OrderT from "./orders.interface";

type ServiceResponse = {
    success?: boolean;
    message?: string;
    data?: OrderT;
};


const insertOrder = async (req: Request, res: Response) => {
    try {
        const result : ServiceResponse | any = await orderServices.postOrder(req.body);

        if (result.success) {
            res.status(200).json({
                success: true,
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
            message: 'Please check the information again!',
        });
    }
}

const getOders = async (req: Request, res: Response) => {
    try {
        if (req.query.email) {
            const result = await orderServices.findOders(req.query.email as string);
            res.status(200).json({
                success: true,
                data: result,
            })
        }
        else {
            const result = await orderServices.findOders(null);
            res.status(200).json({
                success: true,
                data: result,
            })
        }
    }
    catch (error) {
        console.log(error);
    }
}

export const orderControllers = {
    insertOrder,
    getOders,
}