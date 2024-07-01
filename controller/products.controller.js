import Products from "../models/products.model.js";
import AppError from "../utlis/error.utlis.js";
import cloudinary from 'cloudinary'

import exceljs from 'exceljs'
import Customer from "../models/customer.model.js";
import csvtojson from 'csvtojson'
import { response } from "express";
import { log } from "console";
import xlsx from 'xlsx'
import fs from 'fs'

const addProduct = async (req, res, next) => {
  try{
      
      const {price}=req.body
     
      const products=await Products.create({
        price
      })
     
      res.status(200).json({
        success:true,
        message:"Product Added",
        data:products
      })

  }catch(error){
    return next(new AppError(error.message,500))
  }
}


const getProduct = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number, default to 1
    const limit = parseInt(req.query.limit) || 10; // Number of products per page, default to 10

    const skip = (page - 1) * limit; // Calculate skip value based on page number and limit

    const totalCount = await Products.countDocuments(); // Total number of documents in the collection

    const products = await Products.find({})
      .skip(skip)
      .limit(limit)
      .lean(); // Fetch products for the current page

    if (products.length === 0) {
      return res.status(404).json({ success: false, message: 'No products found' });
    }

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      data: products,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalProducts: totalCount,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}


const updateProduct=async(req,res,next)=>{
try{
   
   const {id}=req.params

   console.log(id);

   const product=Products.findById(id)

   if(!product){
      return next(new AppError("Product Not Found",400))
   }


   res.status(200).json({
     success:true,
     message:"Product Update Succesfully"
   })


}catch(error){
  return next(new AppError(error.message,500))
}
}





export {
    addProduct,
    getProduct,
    updateProduct
}