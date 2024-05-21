import { Application, Request, Response } from "express"

const express = require('express')
const app :Application = express()
import cors from 'cors';
import { productRoutes } from "../modules/product/product.route";
import { orderRoutes } from "../modules/orders/orders.route";

app.use(express.json())
app.use(cors())

//app routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);


app.get('/', (req:Request, res:Response) => {
  res.send('E Commerce Server!')
})

export default app;