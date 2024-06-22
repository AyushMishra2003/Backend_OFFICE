import { Router } from "express";
import { addProduct, deleteProduct, getProduct, updateProduct } from "../controller/product.controller.js";



const productRouter=Router()


productRouter.post("/",addProduct)
productRouter.get("/",getProduct)
productRouter.put("/:id",updateProduct)
productRouter.delete("/:id",deleteProduct)




export default productRouter
