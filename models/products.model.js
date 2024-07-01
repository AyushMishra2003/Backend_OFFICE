import {model,Schema} from "mongoose";

const produtsSchema=new Schema(
    {
      price:{
         type:String
      }
    },
    {
        timestamps:true
    }
)


const Products=model("PRODUCTS",produtsSchema)

export default Products