import {model,Schema} from "mongoose";


const produtsSchema=new Schema(
    {
         name:{
            type:String,
            // required:true
         },
         tag:{
            type:String,
            default:null
         },
         sku:{
            type:String,
            default:null
         },
         overview:{
            type:String,
            default:null
         },
         is_vari:{
            type:Number,
            default:0
         },
         is_stock:{
            type:Number,
            default:1
         },
         stock:{
            type:Number,
            default:1
         },
         tax:{
            type:Number,
            default:0
         },
         hsn:{
            type:String,
            default:null
         },
         online:{
            type:Number,
            default:0
         },
         barcode:{
            type:String,
            default:null
         },
         unit:{
            type:String,
            default:null
         },
         max_ord:{
            type:Number,
            default:50
         },
         itm_pos:{
            type:Number,
            default:50
         },
         descr:{
            type:String,
            default:null
         },
         mrp:{
            type:Number,
            default:0
         },
         price: [{
            price_onl: {
                type: String,
                default: '0'
            },
            price_off: {
                type: String,
                default: '0'
            },
            price_cost: {
                type: String,
                default: '0'
            }
        }],
         productImage:[
            {
                public_url:{
                    type:String
                },
                secure_url:{
                    type:String
                }
            }
         ],
         status:{
            type:Number,
            default:1
         },
         flag:{
            type:Number,
            default:1
         }

    },
    {
        timestamps:true
    }
)


const Products=model("PRODUCTS",produtsSchema)

export default Products