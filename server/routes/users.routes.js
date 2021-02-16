/**
 *  Route: /api/users
 **/

const { Router } = require('express');
const router = Router();

// Middlewares
const { verifyToken, verifyUserRole } = require('../middlewares/auth');

// Controllers
const { login, getAllUsers, getUser, createUser } = require('../controllers/users.controller');

router.post('/login', login);

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/create', createUser);

module.exports = router;