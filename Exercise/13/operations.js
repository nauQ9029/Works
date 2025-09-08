const assert = require('assert');
// Create
exports.insertDocument = async (db, document, collection) => {
    const coll = db.collection(collection);
    const result = await coll.insertOne(document);
    assert.equal(result.acknowledged, true);
    console.log("Inserted 1 document into the collection" + collection);
    return result;
};
// Read
exports.findDocuments = async (db, collection) => {
    const coll = db.collection(collection);
    const docs = await coll.find({}).toArray();
    return docs;
};
// Update
exports.updateDocument = async (db, document, update, collection) => {
    const coll = db.collection(collection);
    const result = await coll.updateOne(document, { $set: update });
    assert.equal(result.acknowledged, true);
    console.log("Updated the document with " + JSON.stringify(update)); // Display the content of the update object
    return result;
};
// Delete
exports.removeDocument = async (db, document, collection) => {
    const coll = db.collection(collection);
    const result = await coll.deleteOne(document);
    assert.equal(result.acknowledged, true);
    console.log("Removed the document with " + document);
    return result;
};