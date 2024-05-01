// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// Define the validateLogin middleware
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Emal or username is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors
];

// Log in route
router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.unscoped().findOne({
      where: {
        [Op.or]: [{ username: credential }, { email: credential }]
      }
    });

    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
      return res.status(401).json({
        title: "Bad request.",
        message: "Invalid credentials",
        errors: { password: "Password is required" }
        // Note: 'stack' is omitted intentionally
      });

    }

    // Add firstName and lastName to the safeUser object
    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({ user: safeUser });
  }
);

// Logout route
router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
});

// Restore session user route
router.get('/', restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };
    return res.json({ user: safeUser });
  } else {
    return res.json({ user: null });
  }
});

module.exports = router;
