const jwt = require('jsonwebtoken');

// Verify Token Function
let verifyToken = (req, res, next) => {

    let token = req.get('Authorization')

    jwt.verify(token, process.env.SEED_TOKEN, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                msg: 'You don´t have authorization for this action. Token Invalid!'
            });
        }

        req.user = decoded.user;
        next();

    });

};

// Verify User Role
let verifyUserRole = (req, res, next) => {

    let user = req.user;

    if (user.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.status(401).json({
            ok: false,
            msg: 'You don´t have authorization for this action.'
        });
    }

};

module.exports = {
    verifyToken,
    verifyUserRole
}