const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Username is required'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName') // Validation for firstName
    .exists({ checkFalsy: true })
    .withMessage('First name is required.'),
  check('lastName') // Validation for lastName
    .exists({ checkFalsy: true })
    .withMessage('Last name is required.'),
  handleValidationErrors
];



/// Sign up
/// Sign up
router.post('/', validateSignup, async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;

  try {
    // Check if email or username already exists
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(500).json({
        message: "User already exists",
        errors: { email: "User with that email already exists" }
      });
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(500).json({
        message: "User already exists",
        errors: { username: "User with that username already exists" }
      });
    }

    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      email,
      username,
      hashedPassword,
      firstName,
      lastName
    });

    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    };

    await setTokenCookie(res, safeUser);

    return res.json({ user: safeUser });
  } catch (error) {
    console.error('Failed to sign up user:', error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});
module.exports = router;
