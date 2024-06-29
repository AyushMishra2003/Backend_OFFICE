import AppError from "../utlis/error.utlis.js"
import Document from '../models/document.model.js'
import cloudinary from 'cloudinary'
import fs from 'fs/promises'
import path  from "path"


const uploadCVAndPhoto = async (req, res, next) => {
    try {
      // Check if files were uploaded
      const {name,phoneNumber}=req.body

      console.log(req.body);
     
      if(!name || !phoneNumber){
        return next(new AppError("All field are Required",400))
      }

      if (!req.files || !req.files.cv || !req.files.photo) {
        return res.status(400).json({ message: 'CV or photo not uploaded' });
      }
  
      // Upload CV to Cloudinary
      const cvResult = await cloudinary.uploader.upload(req.files.cv[0].path);
  
      // Upload Photo to Cloudinary
      const photoResult = await cloudinary.uploader.upload(req.files.photo[0].path);
  
      // Create a new document in MongoDB using Document.create()
      const newDocument = await Document.create({
        name,
        phoneNumber,
        cv: {
          public_id: cvResult.public_id,
          secure_url: cvResult.secure_url
        },
        photo: {
          public_id: photoResult.public_id,
          secure_url: photoResult.secure_url
        }
      });
      

      console.log(newDocument);
      

      await newDocument.save()
  
      res.status(200).json({
        success:true,
        message:"Document Added",
        data:newDocument
      })


    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Error creating document with CV and photo', error: error.message });
    }
  }


export {
   uploadCVAndPhoto
}