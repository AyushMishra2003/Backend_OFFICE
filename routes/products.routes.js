import { Router } from "express";
import { addProduct, getProduct } from "../controller/products.controller.js";

import upload from "../middleware/multer.middleware.js";




const productsRouter=Router()


productsRouter.post("/", upload.single('file'), addProduct);

productsRouter.get("/",getProduct)




export default productsRouter