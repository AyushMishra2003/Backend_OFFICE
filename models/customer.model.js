import { model, Schema } from 'mongoose';

const customerSchema = new Schema({

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String }
}, {
    timestamps: true
});

const Customer = model('CUSTOMER', customerSchema);

export default Customer;
