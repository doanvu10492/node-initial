const categoryModel = require('../models/category.model');
exports.create = async (req, res) => {
    // Request validation
    if (!req.body) {
        return  res.status(400).send({
            message: "Category content can not be empty"
        });
    }

    try {
        const category = new categoryModel(req.body);
        await category.save();
        res.status(200).send(category);
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.findAll = async (req, res) => {
    await categoryModel.find().then(categories => {
        res.status(200).send(categories);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving categories."
        });
    });
};


exports.findOne = (req, res) => {
    categoryModel.findById(req.params.id)
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message : "Category not found with id: " + req.params._id
                });
            }

            res.send({category});
        })
        .catch(error => {
            if (error.kind === 'ObjectId') {
                return res.status(404).send({
                    message : "Category not found with id: " + req.params._id
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
            message : "Category can not be empty!"
        });
    }

    categoryModel.findByIdAndUpdate(req.params.id, {
        title : req.body.title || "No category title",
        description: req.body.description,
        price: req.body.price,
        company: req.body.company
    }, {new : true})
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }

            res.send(category);
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
    categoryModel.findByIdAndRemove(req.params.id)
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message : "Category not found!"
                });
            }

            res.send({ message : "Category delete successfully!" })
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message : "Category not found with id: " + req.params.id
                });
            }

            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.id
            });
        })
};
