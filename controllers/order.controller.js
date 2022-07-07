import orderModel from '../models/order.model.js';
import _ from 'lodash';
import productModel from '../models/product.model.js';

class OrderController{
    async createorder(req, res) {
        const product = await productModel.findById(req.body.product);
        if (_.isEmpty(product)) {
            return res.status(404).send({ status: false, message: 'prduct does not exist' });
        }
        const body = { quantity: req.body.quantity, product: req.body.product };
        const order = new  orderModel(body);
        order.save().then((result) => console.log(result)).catch(err => console.log(err))
        return res.status(201).send({status:true,body:order})

    }
    async findOrder(req, res) {
    
        const order = await orderModel.findById(req.params.id);
        if (_.isEmpty(order)) {
            return res.status(404).send({status: true, message:'no order found'})
        }
        return res.status(200).send({ status: true, body: order })
    }
    async getOrder(req, res) {
        
        const order = await orderModel.find().populate('Products');
        console.log(order);
        if (_.isEmpty(order)) {
            return res.status(404).send({status: true,length:0, message:'no product found'})
        }
       
        return res.status(200).send({status:true,length: order.length,body:order})
    }
    async deleteOrder(req, res) {
        
        const order = await orderModel.remove({_id: req.params.id});
        if (_.isEmpty(order)) {
            return res.status(404).send({status: true, message:'no order found'})
        }
        return res.status(200).send({status:true,body:'order deleted'})
    }
}

export default new OrderController();