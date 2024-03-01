const router = require('express').Router();

const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// Set up GET all and POST at /api/users
router
    .route('/')
    .get(getUser)
    .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
    .route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// Set up POST and DELETE at /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;
