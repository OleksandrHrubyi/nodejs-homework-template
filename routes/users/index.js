const express = require("express");
const { required } = require("joi");
const router = express.Router();
const { registration, login, logout, updateAvatar } = require("../../controllers/users");
const guard = require("../../helper/guard");
//const upload = require("../../helper/upload-avatar");
const uploadAvatar = require('../../helper/upload-avatar')

router.post("/signup", registration);
router.post("/login", login);
router.post("/logout", guard, logout);
router.patch(
    "/avatars",
    guard,
    uploadAvatar.single('avatar'),
    updateAvatar)

module.exports = router;
