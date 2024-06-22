import { Model,Schema, model} from "mongoose";


const productSchema=new Schema(
    {
        productName:{
            type:String,
            required:true
        },
        productDetails:{
            type:String
        },
        productPrice:{
            type:String,
            required:true
        },
        productQuantity:{
            type:String,
            required:true
        } 
    },
    {
        timestamps:true
    }
)

const Product=model("Product",productSchema)

export default Product