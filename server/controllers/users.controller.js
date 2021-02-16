const User = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
    let body = req.body;
    User.findOne({ email: body.email }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'The Email or Password are invalid.'
                }
            })
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'The Email or Password are invalid.'
                }
            })
        }

        let token = jwt.sign({
            user: userDB
        }, process.env.SEED_TOKEN, { expiresIn: process.env.TOKEN_TIME });

        res.json({
            ok: true,
            data: userDB,
            token
        });
    });
}

const getAllUsers = (req, res) => {

    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 5;
    limit = Number(limit);

    User.find({ state: true }, 'name email phone role state')
        .sort('name')
        .skip(from)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            User.countDocuments({ state: true }, (err, count) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }

                res.json({
                    ok: true,
                    count: users.length,
                    total: count,
                    data: users
                });
            });
        });
};

const getUser = (req, res) => {
    let id = req.params.id;

    User.findById(id)
        .exec((err, user) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                data: user
            });
        });
};

const createUser = (req, res) => {
    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        phone: body.phone,
        role: body.role,
        password: bcrypt.hashSync(body.password, 10)
    });

    user.save((err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Error creating a user.'
                }
            })
        }

        res.json({
            ok: true,
            data: userDB
        });
    });
};

module.exports = { login, getAllUsers, getUser, createUser };