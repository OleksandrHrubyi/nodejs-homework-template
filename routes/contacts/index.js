const express = require("express");
const router = express.Router();
const actions = require("../../model/index");
const {
  validCreateContact,
  validUpdateContacts,
  validUpdateStatus,
} = require("./validation");

const {
  getAll,
  getById,
  createContact,
  rmContactById,
  updateContactsById,
  updateStatusFav,
} = require("../../controllers/contacts");

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validCreateContact, createContact);

router.patch("/:contactId", validUpdateContacts, updateContactsById);

router.patch("/:contactId/favorite", validUpdateStatus, updateStatusFav);

router.delete("/:contactId", rmContactById);

module.exports = router;
