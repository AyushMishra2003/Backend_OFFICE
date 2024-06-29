import { model, Schema } from 'mongoose';

const customerSchema = new Schema({
    member: { type: String, required: true },
    mobile: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    photo:{
      public_id:{
          type:String
      },
      secure_url:{
          type:String
      }
  },

  },
   {
    timestamps: true
}
);

const Customer = model('CUSTOMER', customerSchema);

export default Customer;
