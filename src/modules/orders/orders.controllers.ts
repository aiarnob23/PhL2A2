import { Request, Response } from "express";
import { orderServices } from "./orders.services";


const insertOrder = async (req: Request, res: Response) => {
    try {
        const result = await orderServices.postOrder(req.body);
        res.status(200).json({
            success: true,
            data: result,
        })
    }
    catch (error) {
        console.log(error);
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