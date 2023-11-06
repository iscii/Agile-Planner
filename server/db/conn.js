import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
config({ path: './config.env' });

const Db = "mongodb+srv://jnatc1:K1nn1th1K1nn1th1@cs-545-cluster.wskgkdr.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _db;

export async function connectToServer(callback) {
  try {
    await client.connect();
    _db = client.db("CS-545-Project");
    console.log("Successfully connected to MongoDB.");
    callback(null);
  } catch (err) {
    callback(err);
  }
}

export function getDb() {
  console.log("Got database.")
  return _db;
}
