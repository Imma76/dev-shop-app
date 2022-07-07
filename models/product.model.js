import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    productImage: {
        type: String
      }
})

const productModel = mongoose.model('Products', productSchema);

export default productModel;