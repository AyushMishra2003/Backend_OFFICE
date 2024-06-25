import Products from "../models/products.model.js";
import AppError from "../utlis/error.utlis.js";
import cloudinary from 'cloudinary'
import fs from 'fs/promises'

async function addProduct() {
    try {
        let counter = 0;

        while (true) {
            // Generate dummy data
            const newProduct = new Products({
                name: `Product ${counter}`,
                // price: Math.floor(Math.random() * 1000) + 1, // Random price between 1 and 1000
            });

            // Save to MongoDB
            await newProduct.save();
            console.log(`Added product: ${newProduct.name}`);

            counter++;

            // Adjust delay as needed to control the insertion rate
            await new Promise(resolve => setTimeout(resolve, 500)); // Insert every 500 milliseconds (0.5 seconds)
        }
    } catch (error) {
        console.error('Error adding dummy data:', error);
    }
}

const getProduct=async(req,res,next)=>{
try{

  const product=await Products.find({})
  const totalCount = await Products.countDocuments();

  console.log(totalCount);
  if(!product){
    return next(new AppError("Product not Find",400))
  }

  res.status(200).json({
    succeess:true,
    message:"All Products are:-",
    data:product,
    total:totalCount
  })

}catch(error){
    return next(new AppError(error.message,500))
}
}






export {
    addProduct,
    getProduct
}