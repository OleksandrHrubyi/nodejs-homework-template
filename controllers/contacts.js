const actions = require("../model/index");

const getAll = async (req, res, next) => {
  try {
    const contacts = await actions.listContacts();
    return res.json({
      status: "succes",
      code: 200,
      message: "contact list in data",
      data: {
        contacts,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const user = await actions.getContactById(req.params.contactId);
    if (user) {
      return res.json({
        status: "succes",
        message: "request contact found",
        code: 200,

        data: {
          user,
        },
      });
    } else {
      return res.json({
        status: "error",
        code: 404,
        message: `no contact with id ${req.params.contactId} found`,
        data: " Not Found",
      });
    }
  } catch (err) {
    next(err);
  }
};

const createContact = async (req, res, next) => {
  try {
    const addContact = await actions.addContact(req.body);
    return res.status(201).json({
      status: "succes",
      code: 201,
      message: "contact created",
      data: {
        addContact,
      },
    });
  } catch (err) {
    next(err);
  }
};

const rmContactById = async (req, res, next) => {
  try {
    const result = await actions.removeContact(req.params.contactId);
    if (result) {
      return res.json({
        status: "succes",
        code: 200,
        message: "contact has already been deleted",
        data: { result },
      });
    } else {
      return res.json({
        status: "error",
        code: 404,
        message: `no contact with id ${req.params.contactId} found`,
        data: " Not Found",
      });
    }
  } catch (err) {
    next(err);
  }
};

const updateContactsById = async (req, res, next) => {
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
};

const updateStatusFav = async (req, res, next) => {
  try {
    if (req.body.favorite) {
      const updateStatusContact = await actions.updateStatusContact(
        req.params.contactId,
        req.body
      );

      return res.status(201).json({
        status: "succes",
        code: 201,
        message: "status updated",
        data: {
          updateStatusContact,
        },
      });
    } else {
      return res.json({
        status: 400,
        message: "missing field favorite",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  createContact,
  rmContactById,
  updateContactsById,
  updateStatusFav,
};
