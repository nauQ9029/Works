const fs = require("fs");

const createFile = async (filename) => {
  try {
    await fs.promises.writeFile(filename, "Hello, World!");
    console.log(`File '${filename}' created successfully`);
  } catch (err) {
    console.error(`Error creating file '${filename}':`, err);
  }
};

const readFile = async (filename) => {
  try {
    const data = await fs.promises.readFile(filename, "utf8");
    console.log(`Contents of file '${filename}':`, data);
    return data;
  } catch (err) {
    console.error(`Error reading file '${filename}':`, err);
    throw err;
  }
};

const appendToFile = async (filename) => {
  try {
    await fs.promises.appendFile(filename, "\nExtra content");
    console.log(`Appended to '${filename}'`);
  } catch (err) {
    console.error(`Error appending:`, err);
  }
};

const deleteFile = async (filename) => {
  try {
    await fs.promises.unlink(filename);
    console.log(`Deleted '${filename}'`);
  } catch (err) {
    console.error(`Error deleting:`, err);
  }
};

module.exports = {
  createFile,
  readFile,
  appendToFile,
  deleteFile,
};
