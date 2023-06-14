const { MongoClient } = require('mongodb');

const config = require('../config.json');


const mongo = () => {
    const mongoURL = `mongodb+srv://${config.username}:${config.password}@cluster0.ycvperg.mongodb.net/${config.database_name}?retryWrites=true&w=majority`;
    let db = null;

    async function connect() {
        try {
            const client = new MongoClient(mongoURL);
            await client.connect();

            db = client.db();

            console.log('Connected to Mongo DB');
        } catch (error) {
            console.log(error);
        }
    }

    async function save(collectionName, data) {
        try {
            const collection = db.collection(collectionName);
            await collection.insertOne(data);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * @description                      performs a query on a mongo collection by deckId
     * @param {String} collectionName    name of a collection in mongo
     * @param {Object} deckIdentifier    deckId to query
     * @return {Object or Array}         the card object by deck id or all results
     */
    async function find(collectionName, searchTerm) {
        try {
            const collection = db.collection(collectionName);

            if (searchTerm) {
                return await collection.find({ searchTerm }).next();
            } else {
                return await collection.find({}).toArray();
            }
        } catch (error) {
            return null
        }
    }

    async function update(collectionName, data) {
        try {
            const collection = db.collection(collectionName);
            const { searchTerm, ...restOfData} = data

            await collection.updateOne(
                { searchTerm },
                { $set: restOfData }
            );

        } catch (error) {
            console.log(error);
        }
    }

    return {
        connect,
        save,
        find,
        update
    };
};

module.exports = mongo();
