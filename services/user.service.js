const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.create = async (req, res) => {
    try {
        const existUser = userModel.findOne({email: req.body.email});
        if (existUser) {
            return res.send({
                message : "User is exists!"
            });
        }
        const user = new userModel(req.body);
        const token = await user.generateAuthToken();
        await user.save();
        res.status(200).send({user, token});
    } catch (error) {
        res.status(400).send(error)
    }
};


exports.findAll = async (req, res) => {
    await userModel.find().then(user => {
        res.status(200).send(user);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};


exports.findOne = (req, res) => {
    userModel.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message : "User not found with id: " + req.params._id
                });
            }

            res.send({user});
        })
        .catch(error => {
            if (error.kind === 'ObjectId') {
                return res.status(404).send({
                    message : "User not found with id: " + req.params._id
                });
            }

            return res.status(500).send({
                message: "Error retrieving note with id " + req.params._id
            });
        });
};


exports.update = (req, res) => {
    if (!req.params) {
        return res.status(400).send({
            message : "User can not be empty!"
        });
    }

    userModel.findByIdAndUpdate(req.params.id, {
        email : req.params.email,
        password: req.params.password
    }, {new : true})
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }

            res.send(user);
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
    userModel.findByIdAndRemove(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                   message : "User not found with id: " + req.params.id
                });
            }

            res.send({ message : "User delete successfully!" })
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message : "User not found with id: " + req.params.id
                });
            }

            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.id
            });
        })
};

exports.login = async (req, res) => {
    console.log(2232323);
    var email = req.body.email;
    var password = req.body.password;

    if (!email || !password) {
        return res.status(404).send({
            message : "Please input full for username and password !"
        });
    }

    userModel.findOne({
        email : email
    })
        .then(async (user) => {
            const match = await bcrypt.compare(password, user.password);

            if (!user || !match) {
                return res.status(404).send({
                    message : "User not found"
                });
            }

            const token = await user.generateAuthToken();
            res.send({user, token});
        })
        .catch(error => {
            return res.status(500).send({
                message: error
            });
        });
};