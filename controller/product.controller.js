import Product from "../models/product.model.js";
import AppError from "../utlis/error.utlis.js";



const addProduct=async(req,res,next)=>{
try{
    
   const {productName, productDetails,productPrice, productQuantity}=req.body

   console.log(req.body);

   if(!productName  || !productPrice || !productQuantity){
    return next(new AppError("Every Filed is Required"))
   }

   const product=await Product.create({
      productName,
      productDetails,
      productPrice,
      productQuantity
   })

   if(!product){
    return next(new AppError("Product Not Created",400))
   }


   await product.save()
   

   res.status(200).json({
      success:true,
      message:"Product Added Succesfully:-",
      data:product
   })
  


}catch(errror){
    return next(new AppError(errror.message,500))
}
}


const getProduct=async(req,res,next)=>{
    try{

      const products=await Product.find({}) 
      
      if(!products){
        return next(new AppError("Product Not Found",400))
      }

      res.status(200).json({
        success:true,
        message:"All Products are:-",
        data:products
      })


    }catch(error){
        return next(new AppError(error.message,500))
    }
}


const updateProduct=async(req,res,next)=>{
    try{

        const {id}=req.params

        const product = await Product.findByIdAndUpdate(
            id,
            { $set: req.body }, 
            { new: true, runValidators: true } 
        )

        if(!product){
            return next(new AppError("Product Not Found",400))
        }

        res.status(200).json({
            success:true,
            message:"Product Updated Succesfully",
            data:product
        })

    }catch(error){
        return next(new AppError(error.message,500))
    }

}

const deleteProduct=async(req,res,next)=>{
try{

    const {id}=req.params

    const product=await Product.findByIdAndDelete(id)

    if(!product){
        return next(new AppError("Product Not Found",400))
    }

    res.status(200).json({
        success:true,
        message:"Product Delete Succesfully"
    })


}catch(error){
    return next(new AppError(error.message,500))
}
}


export {
    addProduct,
    getProduct,
    updateProduct,
    deleteProduct
}