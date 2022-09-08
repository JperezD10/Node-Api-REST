const {Router} = require('express');
const { check } = require('express-validator');

const { getUser, postUser, putUser, deleteUser } = require('../controllers/user.controller');
const { validateRole, validateEmail, validateUserId } = require('../helpers/db-validators');
const { fieldValidator } = require('../middlewares/fieldValidator');
const {jwtValidator} = require('../middlewares/jwtValidator');

const router = Router();

router.get('/', getUser);

router.post('/',[
    jwtValidator,
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('email').custom(validateEmail),
    check('password', 'Password is required. At least 6 characters').isLength({min: 6}),
    check('role').custom( validateRole ),
    fieldValidator
], postUser);

router.put('/:id',[
    check('id', 'Invalid Id').isMongoId(),
    check('id').custom(validateUserId),
    check('role').custom( validateRole ),
    fieldValidator
], putUser);

router.delete('/:id',[
    jwtValidator,
    check('id', 'Invalid Id').isMongoId(),
    check('id').custom(validateUserId),
], deleteUser);

module.exports = router;