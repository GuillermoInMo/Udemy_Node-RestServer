const { response } = require("express");
const { Category } = require('../models');
 
const postCategory = async(req, res = response) => {
    const name = req.body.name.toUpperCase();

    const categoryDb = await Category.findOne({name});
    
    if(categoryDb){
        return res.status(400).json({
            msg: `La categoria ${categoryDb.name} ya existe`
        })
    }
    const data = {
        name, 
        user: req.userReq._id
    };

    const categoria = await new Category(data);

    await categoria.save();

    res.status(201).json(categoria);
}

module.exports = {
    postCategory
}