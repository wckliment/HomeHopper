// backend/routes/api/index.js
const router = require("express").Router();
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
// This middleware ensures that if there's a valid current user session,
// req.user will be set to the user in the database.
// If there is NO valid current user session, then req.user will be set to null.
router.use(restoreUser);

// You can start adding your actual route handlers here
// Example: router.get('/some-protected-route', (req, res) => {
//   if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
//   res.json({ message: 'Success', user: req.user });
// });

module.exports = router;

