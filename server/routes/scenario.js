import express from 'express'
import { scenarios } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
const scenarioRoutes = express.Router();

scenarioRoutes.route("/").get(async function (req, res) {
  try {
    let scenarioCollection = await scenarios();
    const result = await scenarioCollection.find({}).toArray();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


scenarioRoutes.route("/scenario/:id").get(async function (req, res) {
  try {
    let myquery = { _id: new ObjectId(req.params.id) };

    let scenarioCollection = await scenarios();
    const result = await scenarioCollection.findOne(myquery);

    res.json(result);
  } catch (err) {
    throw err;
  }
});

scenarioRoutes.route("/scenario/add").post(async function (req, response) {
  try {
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
    let scenarioCollection = await scenarios();
    const res = await scenarioCollection.insertOne(myobj);
    response.json(res);
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: "Error occurred while adding the scenario." });
  }
});

scenarioRoutes.route("/edit/:id").post(async function (req, response) {
  try {
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
    
    let scenarioCollection = await scenarios();
    const res = await scenarioCollection.updateOne(myquery, newvalues);
    console.log("1 document updated");
    response.json(res);
  } catch (err) {
    throw err;
  }
});

scenarioRoutes.route("/delete/:id").delete(async (req, response) => {
  try {
    let myquery = { _id: new ObjectId(req.params.id) };
    let scenarioCollection = await scenarios();

    const obj = await scenarioCollection.deleteOne(myquery);
    console.log("1 document deleted");
    response.json(obj);
  } catch (err) {
    throw err;
  }
});

  
 export default scenarioRoutes;

