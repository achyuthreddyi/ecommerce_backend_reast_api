const express = require('express')
const { check } = require('express-validator')
const { isSignedIn, isAdmin } = require('../middleware/authMiddleware')
const {
  signOut,
  signUp,
  signIn,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers
} = require('./userController')

const router = express.Router()

// router.param('userId', getUserParam)

router.post(
  '/signup',
  [
    check('name')
      .isLength({ min: 3 })
      .withMessage('must be at least 3 chars long'),
    check('email')
      .isEmail()
      .withMessage('must be a proper email')
  ],
  signUp
)
router.post(
  '/signin',
  [
    check('password')
      .isLength({ min: 3 })
      .withMessage('must be at least 3 chars long'),

    check('email')
      .isEmail()
      .withMessage('must be a proper email')
  ],
  signIn
)
// router.get('/:userId', isSignedIn, isAuthenticated, getUser)
router.get('/signout', signOut)
router
  .route('/:userId')
  .get(isSignedIn, getUser)
  .put(isSignedIn, updateUser)
  .delete(isSignedIn, deleteUser)

router.route('/admin/userlist').get(isSignedIn, isAdmin, getAllUsers)

// router.get('/order/:userId', isSignedIn, isAuthenticated, userPurchaseList)

module.exports = router
