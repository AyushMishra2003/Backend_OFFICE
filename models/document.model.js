import {model,Schema} from 'mongoose'



const documentSchema=new Schema(
    {
        name:{
            type:String,
        },
        phoneNumber:{
            type:String
        },
        photo:{
            public_id:{
                type:String
            },
            secure_url:{
                type:String
            }
        },
        cv:{
            public_id:{
                type:String
            },
            secure_url:{
                type:String
            }
        }
    },
    {
        timestamps:true
    }
)


const Document=model("Document",documentSchema)

export default Document