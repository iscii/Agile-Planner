import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
config({ path: './config.env' });

const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _db;

export async function connectToServer(callback) {
  try {
    await client.connect();
    _db = client.db("employees");
    console.log("Successfully connected to MongoDB.");
    callback(null);
  } catch (err) {
    callback(err);
  }
}

export function getDb() {
  return _db;
}
