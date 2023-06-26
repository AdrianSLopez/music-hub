const { MongoClient } = require('mongodb');

const config = require('../config.json');


const mongo = () => {
    const mongoURL = `mongodb+srv://${config.mongoDBUsername}:${config.mongoPassword}@music-hub-temp.sdtmsmo.mongodb.net/${config.mongoDatabaseName}?retryWrites=true&w=majority`;
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

    async function save(data) {
        try {
            const collection = db.collection("public-recommendations");
            await collection.insertOne(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getRecommendations() {
        try {
            const collection = db.collection("public-recommendations");
            await collection.findOneAndDelete({}, {sort:{_id:1}})

            return await collection.find({}).sort({_id: -1}).toArray();
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
        update,
        save,
        getRecommendations
    };
};

module.exports = mongo();
