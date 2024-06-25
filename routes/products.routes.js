import { Router } from "express";
import { addProduct, getProduct } from "../controller/products.controller.js";



const productsRouter=Router()


productsRouter.post("/",addProduct)

productsRouter.get("/",getProduct)




export default productsRouter