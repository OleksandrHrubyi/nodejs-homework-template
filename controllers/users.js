const jwt = require("jsonwebtoken");
const jimp = require('jimp');
const fs = require('fs/promises');
const path = require('path')
const Users = require("../model/users");
const { HttpCode } = require("../helper/constants");
const { writeAsync } = require("jimp");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const registration = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await Users.findByEmail();
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: "error",
      code: HttpCode.CONFLICT,
      message: "Email in use",
    });
  }
  try {
    const newUser = await Users.create(req.body);
    return res.status(HttpCode.CREATED).json({
      status: "succes",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
        avatar: newUser.avatar
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findByEmail(email);

  const isValidPassword = await user?.validPassword(password);

  if (!user || !isValidPassword) {
    return res.status(HttpCode.UNAUTH).json({
      status: "error",
      code: HttpCode.UNAUTH,
      message: "Invalid credential",
    });
  }

  const payload = { id: user.id };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "2h" });
  await Users.updateToken(user.id, token);
  return res.status(HttpCode.OK).json({
    status: "succes",
    code: HttpCode.OK,
    data: { token },
  });
};

const logout = async (req, res, next) => {
  const id = req.user.id;
  await Users.updateToken(id, null);
  return res.status(HttpCode.NO_CONTENT).json({});
};

const updateAvatar = async (req, res, next) => {
  const { id } = req.user
  const avatarUrl = await saveAvatarUser(req)
  await Users.updateAvatar(id, avatarUrl)
  return res.status(HttpCode.OK).json({ status: 'succes', code: HttpCode.OK, data: { avatarUrl } })
}

const saveAvatarUser = async (req) => {
  const FOLDER_AVATARS = process.env.FOLDER_AVATARS
  const pathFile = req.file.path;
  const newNameAvatar = `${Date.now().toString()}-${req.file.originalname}`;
  const img = await jimp.read(pathFile);
  await img.autocrop().cover(400, 400, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE).writeAsync(pathFile);
  try {
    await fs.rename(pathFile, path.join(process.cwd(), 'public', FOLDER_AVATARS, newNameAvatar))
  }
  catch (err) {
    console.log(err.message);
  }
  const oldAvatar = req.user.avatar
  if (oldAvatar.includes(`${FOLDER_AVATARS}`)) {
    await fs.unlink(path.join(process.cwd(), 'public', oldAvatar))
  }

  return path.join(FOLDER_AVATARS, newNameAvatar)
}
module.exports = {
  registration,
  login,
  logout,
  updateAvatar
};
