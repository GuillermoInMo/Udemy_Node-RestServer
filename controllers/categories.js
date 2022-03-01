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
                .populate('user')
    ]);

    res.json({
        total,
        categories
    });
}

const getCategory = async(req, res = response) => {
    const { id } = req.params;

    const categoria = await Category.findById(id).populate('user');

    if(!categoria){
        return res.status(400).json({
            msg: `La categoria con el id ${id} no existe`
        });
    }

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

    const categoryDb = await Category.findById(id);
    
    if(!categoryDb){
        return res.status(400).json({
            msg: `La categoria con el id ${id} no existe`
        })
    }

    if(!categoryDb.active){
        return res.status(400).json({
            msg: `La categoria ${categoryDb.name} está inactiva`
        })
    }

    const data = {
        name: req.body.name,
        user: req.userReq._id
    }

    const category = await Category.findByIdAndUpdate(id, data);

    res.status(201).json(category);
}

const deleteCategory = async(req, res = response) => {
    const { role } = req.userReq;

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: 'No cuenta con el permiso para realizar esta acción'
        });
    }

    const { id } = req.params;
    
    const category = await Category.findByIdAndUpdate(id, {active: false});

    res.json(category);
}

module.exports = {
    getCategories,
    getCategory,
    postCategory,
    putCategory,
    deleteCategory
}