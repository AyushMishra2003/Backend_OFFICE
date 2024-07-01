import { Router } from "express";
import { addProduct, getProduct ,updateProduct} from "../controller/products.controller.js";
import upload from "../middleware/multer.middleware.js";
import loggingMiddleware from "../middleware/log.middleware.js";


const productsRouter=Router()


// productsRouter.post("/", upload.single('file'), addProduct);


productsRouter.post("/",addProduct)
productsRouter.get("/",getProduct)
productsRouter.put("/:id",updateProduct)




export default productsRouter