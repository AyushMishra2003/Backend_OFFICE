import {model,Schema} from 'mongoose'


const customerSchema=new Schema(
    {
        wallet:{
            type:String,
            default:0
        },
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            default:null,
        },
        mobile:{
            type:Number,
            default:null
        },
        gender:{
            type:String,
            enum:['MALE','FEMALE'],
            default:null
        },
        dob:{
            type:String,
            default:null
        },
        card_id:{
            type:String
        },
        orderCount:{
            type:Number,
            default:0
        },
        orderCount_date:{
            type:String,
            default:null
        },
        status:{
            type:String,
            enum:["0","1"],
            default:"0"
        },
        orderDate:{
            type:String,
        },
        flag_wm:{
            type:Number,
            default:0
        },
        token:{
            type:String,
            default:null
        }
    },
    {
        timestamps:true
    }
)



const Customer=model('CUSTOMER',customerSchema)

export default Customer