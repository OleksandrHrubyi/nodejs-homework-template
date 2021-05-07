const express = require("express");
const router = express.Router();
// const actions = require("../../model/index");
const {
  validCreateContact,
  validUpdateContacts,
  validUpdateStatus,
  validQueryContact,
} = require("./validation");

const {
  getAll,
  getById,
  createContact,
  rmContactById,
  updateContactsById,
  updateStatusFav,
} = require("../../controllers/contacts");

const guard = require("../../helper/guard");

router.get("/", guard, validQueryContact, getAll);

router.get("/:contactId", guard, getById);

router.post("/", guard, validCreateContact, createContact);

router.patch("/:contactId", guard, validUpdateContacts, updateContactsById);

router.patch("/:contactId/favorite", guard, validUpdateStatus, updateStatusFav);

router.delete("/:contactId", guard, rmContactById);

module.exports = router;
