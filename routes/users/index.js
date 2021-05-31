const express = require("express");
const router = express.Router();
const { registration, login, logout, updateAvatar, verify, repeatEmailVerify } = require("../../controllers/users");
const guard = require("../../helper/guard");
const uploadAvatar = require('../../helper/upload-avatar')

router.post("/signup", registration);
router.post("/login", login);
router.post("/logout", guard, logout);
router.patch(
    "/avatars",
    guard,
    uploadAvatar.single('avatar'),
    updateAvatar)

router.get('/verify/:token', verify)
router.post('/verify', repeatEmailVerify)

module.exports = router;
