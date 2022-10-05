const { response } = require("express");
const { Product } = require('../models');

const postProduct = async(req, res = response) => {
    const {user, ...data} = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.userReq._id;

    const productDb = await Product.findOne({name: data.name})

    if(productDb){
        return res.status(400).json({
            msg: `El producto ${productDb.name} ya existe`
        });
    }

    const product = await new Product(data);

    await product.save();

    res.status(201).json(product);
}

module.exports = {
    postProduct
}