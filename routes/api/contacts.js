const express = require("express");
const router = express.Router();
const actions = require("../../model/index");
const { validCreateContact, validUpdateContacts } = require("../validation");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await actions.listContacts();
    return res.json({
      status: "succes",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const user = await actions.getContactById(req.params.contactId);
    if (user) {
      return res.json({
        status: "succes",
        code: 200,
        data: {
          user,
        },
      });
    } else {
      return res.json({
        status: "error",
        code: 404,
        data: " Not Found",
      });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", validCreateContact, async (req, res, next) => {
  try {
    const addContact = await actions.addContact(req.body);
    return res.status(201).json({
      status: "succes",
      code: 201,
      data: {
        addContact,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const removeContact = await actions.removeContact(req.params.contactId);
    return res.json({
      status: "succes",
      code: 200,
      data: {
        removeContact,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.patch("/:contactId", validUpdateContacts, async (req, res, next) => {
  try {
    const updatedUser = await actions.updateContact(
      req.params.contactId,
      req.body
    );
    return res.json({
      status: "succes",
      code: 200,
      data: {
        updatedUser,
      },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
