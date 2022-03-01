const { response } = require("express");
const { Category } = require('../models');

const getCategories = async(req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = {active: true};

    const[total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('user', 'name')
    ]);

    res.json({
        total,
        categories
    });
}

const getCategory = async(req, res = response) => {
    const { id } = req.params;

    const categoria = await Category.findById(id).populate('user', 'name');

    if(!categoria.active){
        return res.status(400).json({
            msg: `La categoria ${categoria.name} está inactiva`
        })
    }

    res.json(categoria);
}

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

const putCategory = async(req, res = response) => {
    const { id } = req.params;
    
    const { active, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.userReq._id;

    const category = await Category.findByIdAndUpdate(id, data, {new: true});

    res.json(category);
}

const deleteCategory = async(req, res = response) => {
    const { id } = req.params;
    
    const category = await Category.findByIdAndUpdate(id, {active: false}, {new: true});

    res.json(category);
}

module.exports = {
    getCategories,
    getCategory,
    postCategory,
    putCategory,
    deleteCategory
}