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
  // try {
  //   const expectedHeaders = ['S.No', 'Name', 'Email', 'Mobile'];
  //   let actualHeaders = [];

  //   // Using csv-parser library to parse CSV file
  //   csv()
  //     .fromFile(req.file.path)
  //     .subscribe((csvRow) => {
  //       // Assuming the first row contains headers
  //       if (actualHeaders.length === 0) {
  //         actualHeaders = Object.keys(csvRow);
          
  //         // Validate headers
  //         const areHeadersValid = expectedHeaders.every(header => actualHeaders.includes(header));
  //         if (!areHeadersValid) {
  //            return next(new AppError("Not Found",400))
  //         }
  //       } else {
  //         // Map data fields based on headers
  //         const userData = {
  //           name: csvRow['Name'],
  //           email: csvRow['Email'],
  //           contact: csvRow['Mobile']
  //         };

  //         // Save userData to MongoDB or process as needed
  //         // Example: Save to MongoDB using Mongoose
  //         const customer = new Customer(userData);
  //         customer.save();
  //       }
  //     }, (error) => {
  //       console.error('Error parsing CSV:', error);
  //       return next(new AppError('Error parsing CSV', 500));
  //     }, () => {
  //       // Once all data is processed, send success response
  //       res.status(200).json({
  //         success: true,
  //         message: "Data added successfully"
  //       });
  //     });

  // } catch (error) {
  //   // Handle any unexpected errors
  //   console.error('Unexpected error:', error);
  //   return next(new AppError(error.message, 500));
  // }
   csvtojson()
         .fromFile("posts.csv")
         .then(csvData=>{
           Customer.insertMany(csvData).then(()=>{
              res.status(200).json({
                success:200,
                message:"ajakmn"
              }).catch((error)=>{
                  res.status(400).json({
                    message:"Not Added"
                  })
              })
           })
         })
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





export {
    addProduct,
    getProduct
}