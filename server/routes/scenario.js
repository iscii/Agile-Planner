import express from 'express'
import {getDb, connectToServer} from "/Users/charlierome/CS-545-Project-v2/server/CS-545-Proj-v2/server/db/conn.js"
import { ObjectId } from 'mongodb';
const scenarioRoutes = express.Router();

scenarioRoutes.route("/").get(async function (req, res) {
  try {
    let db_connect = getDb();
    const result = await db_connect.collection("Scenarios").find({}).toArray();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


scenarioRoutes.route("/scenario/:id").get(async function (req, res) {
  try {
    let db_connect = dbo.getDb();
    let myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect.collection("Scenarios").findOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

scenarioRoutes.route("/scenario/add").post(async function (req, response) {
  try {
    let db_connect = getDb();
    let myobj = {
      userId: req.body.userId,
      title: req.body.title,
      description: req.body.description,
      acceptanceCriteria: req.body.acceptanceCriteria,
      teamName: req.body.teamName,
      bugs: [],
      changeRequests: [],
      features: [],
      userStories: []
    };

    console.log(myobj);

    const res = await db_connect.collection("Scenarios").insertOne(myobj);
    response.json(res);
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: "Error occurred while adding the scenario." });
  }
});

scenarioRoutes.route("/edit/:id").post(async function (req, response) {
  try {
    let db_connect = getDb();
    let myquery = { _id: new ObjectId(req.params.id) };
    let newvalues = {
      $set: {
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description,
        acceptanceCriteria: req.body.acceptanceCriteria,
        teamName: req.body.teamName,
      },
    };

    const res = await db_connect.collection("Scenarios").updateOne(myquery, newvalues);
    console.log("1 document updated");
    response.json(res);
  } catch (err) {
    throw err;
  }
});

scenarioRoutes.route("/delete/:id").delete(async (req, response) => {
  try {
    let db_connect = getDb();
    let myquery = { _id: new ObjectId(req.params.id) };
    const obj = await db_connect.collection("Scenarios").deleteOne(myquery);
    console.log("1 document deleted");
    response.json(obj);
  } catch (err) {
    throw err;
  }
});

  
 export default scenarioRoutes;

