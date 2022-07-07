import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    name: String,
    quantity: { type: Number , default:1},
    product: { type: String, ref:'Products'}
})

const orderModel = mongoose.model('Order', orderSchema);

export default orderModel;