const productModel = require('../models/product.model');

exports.create = async (req, res) => {
    // Request validation
    if (!req.body) {
        return  res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    try {
        const product = new productModel(req.body);
        await product.save();
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.findAll = async (req, res) => {
    await productModel.find().then(products => {
        res.status(200).send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
        });
    });
};


exports.findOne = (req, res) => {
    productModel.findById(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message : "Product not found with id: " + req.params._id
                });
            }

            res.send({product});
        })
        .catch(error => {
            if (error.kind === 'ObjectId') {
                return res.status(404).send({
                    message : "Product not found with id: " + req.params._id
                });
            }

            return res.status(500).send({
                message: "Error retrieving note with id " + req.params._id
            });
        });
};


exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message : "Product can not be empty!"
        });
    }

    productModel.findByIdAndUpdate(req.params.id, {
        title : req.body.title || "No product title",
        description: req.body.description,
        price: req.body.price,
        company: req.body.company
    }, {new : true})
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }

            res.send(product);
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.noteId
            });
        })
};


exports.delete = (req, res) => {
    productModel.findByIdAndRemove(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message : "Product not found!"
                });
            }

            res.send({ message : "Product delete successfully!" })
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message : "Product not found with id: " + req.params.id
                });
            }

            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.id
            });
        })
};
