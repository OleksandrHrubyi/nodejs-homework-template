const fs = require("fs").promises;
const shortid = require("shortid");
const path = require("path");

const contactsPath = path.join("model", "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const result = JSON.parse(data);
    const user = result.find((el) => el.id === Number(contactId));
    return user;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const resultArray = JSON.parse(data);
    const result = resultArray.filter((el) => el.id !== Number(contactId));
    await fs.writeFile(contactsPath, JSON.stringify(result, null, "\t"));
    return result;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async ({ name, email, phone }) => {
  const user = {
    id: shortid.generate(),
    name,
    email,
    phone,
  };
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const arr = JSON.parse(data);
    arr.push(user);
    await fs.writeFile(contactsPath, JSON.stringify(arr, null, "\t"));
    return user;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const allContacts = await listContacts();
    const updatedContacts = allContacts.map((el) => {
      if (el.id === Number(contactId)) {
        const newEl = Object.assign(el, body);
        return newEl;
      } else {
        return el;
      }
    });
    if (updatedContacts) {
      fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, "\t"));
    }
    return updatedContacts;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
