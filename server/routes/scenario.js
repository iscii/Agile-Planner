import express from 'express'
import { scenarios,users } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
const scenarioRoutes = express.Router();
import { createUser, deleteUser } from '../db/users.js';

scenarioRoutes.route("/scenarios/:userId").get(async function (req, res) {
  try {
    const userId = req.params.userId; // Get user ID from URL parameters
    let scenarioCollection = await scenarios();
    const result = await scenarioCollection.find({ userId: userId }).toArray(); // Filter scenarios by userId
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

scenarioRoutes.post("/createUser", async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Check if userName is missing or empty
    if (!userName) {
      return res.status(400).json({ error: "Please provide a username." });
    }

    // Validate the email format using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address." });
    }

    // Check if password is missing or empty
    if (!password) {
      return res.status(400).json({ error: "Please provide a password." });
    }

    const result = await createUser(userName, email, password);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    res.status(201).json({ userId: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

scenarioRoutes.delete("/deleteUser", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email is missing or empty
    if (!email) {
      return res.status(400).json({ error: "Please provide an email address." });
    }

    const isDeleted = await deleteUser(email);

    if (isDeleted) {
      // User was successfully deleted
      res.status(200).json({ message: "User deleted successfully." });
    } else {
      // User with the provided email was not found
      res.status(404).json({ error: "User with the provided email not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

 export default scenarioRoutes;

