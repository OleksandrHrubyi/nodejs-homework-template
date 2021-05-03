const Joi = require("joi");

const schemaAddContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.number(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .optional(),
  phone: Joi.number().optional(),
}).or("name", "email", "phone");

const schemaUpdateStatus = Joi.object({
  favorite: Joi.boolean(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    return next();
  } catch (err) {
    console.log(err);
    next({ status: 400, message: err.message });
  }
};

module.exports = {
  validCreateContact: async (req, res, next) => {
    return await validate(schemaAddContact, req.body, next);
  },
  validUpdateContacts: async (req, res, next) => {
    return await validate(schemaUpdateContact, req.body, next);
  },
  validUpdateStatus: async (req, res, next) => {
    return await validate(schemaUpdateStatus, req.body, next);
  },
};
