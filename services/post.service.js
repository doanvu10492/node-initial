const postModel = require('../models/post.model');

const create = async (req, res) => {
    // Request validation
    if (!req.body) {
        return  res.status(400).send({
            message: "Post content can not be empty"
        });
    }

    try {
        const post = new postModel(req.body);
        await post.save();

        res.status(200).send(post);
    } catch (error) {
        res.status(400).send(error)
    }
};

const findAll = async (req, res) => {
    await postModel.find()
        .populate('cateId')
        .exec()
        .then(posts => {
            res.status(200).send(posts);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving posts."
            });
        });
};


const findOne = (req, res) => {
    postModel.findById(req.params.id)
        .populate(['cateId'])
        .exec()
        .then(post => {
            if (!post) {
                return res.status(404).send({
                    message : "Post not found with id: " + req.params._id
                });
            }

            res.send({post});

            if (typeof post.log === 'function') {
                post.log({
                    action: req.method,
                    category: req.url,
                    createdBy: "60be45b4205911b6a33c1e7d",
                    params: JSON.stringify(req.body),
                    response: JSON.stringify(post)
                });
            }
        })
        .catch(error => {
            if (error.kind === 'ObjectId') {
                return res.status(404).send({
                    message : "Post not found with id: " + req.params._id
                });
            }

            return res.status(500).send({
                message: "Error retrieving note with id " + req.params._id
            });
        });
};


const update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message : "Post can not be empty!"
        });
    }

    postModel.findByIdAndUpdate(req.params.id, {
        title : req.body.title || "No post title",
        description: req.body.description,
        price: req.body.price,
        company: req.body.company
    }, {new : true})
        .then(post => {
            if (!post) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }

            res.send(post);

            if (typeof post.log === 'function') {
                post.log({
                    action: req.method,
                    category: req.url,
                    createdBy: "60be45b4205911b6a33c1e7d",
                    params: JSON.stringify(req.body),
                    response: JSON.stringify(post)
                });
            }
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


const deletePost = (req, res) => {
    postModel.findByIdAndRemove(req.params.id)
        .then(post => {
            if (!post) {
                return res.status(404).send({
                    message : "Post not found!"
                });
            }

            res.send({ message : "Post delete successfully!" })
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message : "Post not found with id: " + req.params.id
                });
            }

            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.id
            });
        })
};

module.exports = {
    create,
    findAll,
    findOne,
    update,
    deletePost
};