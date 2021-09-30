const express = require("express");
const router = express.Router();
const { registration, login, logout, updateAvatar, refresh, getFavorites } = require("../../controllers/users");
const guard = require("../../helper/guard");
const uploadAvatar = require('../../helper/upload-avatar')

router.post("/signup", registration);
router.post("/login", login);
router.get("/current", guard, refresh);
router.post("/logout", guard, logout);
router.param("/:filmId/favorite", guard, getFavorites)
router.patch(
    "/avatars",
    guard,
    uploadAvatar.single('avatar'),
    updateAvatar)

// router.get('/verify/:token', verify)
// router.post('/verify', repeatEmailVerify)

module.exports = router;
