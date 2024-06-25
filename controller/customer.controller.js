import AppError from "../utlis/error.utlis.js"
import Customer from "../models/customer.model.js"


const addCustomer=async(req,res,next)=>{
try{
   const {name,email,mobile,gender,dob,card_id,orderCount,status,flag_wm}=req.body
    
   console.log(req.body);

   if(!name || !email){
    return next(new AppError("All Filed are Required",400))
   }

   const customer=await Customer.create({
      name,
      email,
      gender,
      dob,
      card_id,
      orderCount,
      status,
      flag_wm,
      mobile
   })

   if(!customer){
    return next(new AppError("Customer not Created,please try again",400))
   }

   res.status(200).json({
     success:true,
     message:"adding customer are:-",
     data:customer
   })
}catch(error){
    return next(new AppError(error.message,500))
}
}


const getCustomer=async(req,res,next)=>{
try{

  const customer=await Customer.find({})

  if(!customer){
    return next(new AppError("Customer Not Found",400))
  }

  res.status(200).json({
     success:true,
     message:"All Customer Are:-",
     data:customer
  })

}catch(error){
  return next(new AppError(error.message,500))
}
}


export {
    addCustomer,
    getCustomer
}