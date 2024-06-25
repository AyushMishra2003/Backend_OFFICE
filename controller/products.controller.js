import Products from "../models/products.model.js";
import AppError from "../utlis/error.utlis.js";

const addProduct = async (req, res, next) => {
    try {
        console.log(req.body);
        const {
            name, tag, sku, is_vari, is_stack, stock, tax, hsn, online, 
            barcode, unit, max_ord, itm_pos, descr, mrp, price, productImage, 
            status, flag
        } = req.body;

        const product = await Products.create({
            name, tag, sku, is_vari, is_stack, stock, tax, hsn, online, 
            barcode, unit, max_ord, itm_pos, descr, mrp, price, status, flag
        });

        if (!product) {
            return next(new AppError("Product not created", 400));
        }

        await product.save();

        res.status(200).json({
            success: true,
            message: "Product added successfully",
            data: product  
        });

    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}


const getProduct=async(req,res,next)=>{
try{

  const product=await Products.find({})
   
  if(!product){
    return next(new AppError("Product not Find",400))
  }

  res.status(200).json({
    succeess:true,
    message:"All Products are:-",
    data:product
  })

}catch(error){
    return next(new AppError(error.message,500))
}
}



export {
    addProduct,
    getProduct
}