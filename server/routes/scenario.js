import express from 'express'
import * as dbo from "/Users/charlierome/CS-545-Project-v2/server/CS-545-Proj-v2/server/db/conn.js"
import { ObjectId } from 'mongodb';
const scenarioRoutes = express.Router();

scenarioRoutes.route("/").get(function(req,res){
  let db_connect = dbo.getDb("CS-545-Project");
  db_connect
   .collection("Scenarios")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

scenarioRoutes.route("/scenario/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("Scenarios")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

 scenarioRoutes.route("/scenario/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    userId: req.body.userId,
    title: req.body.title,
    desciption: req.body.desciption,
    acceptanceCriteria: req.body.acceptanceCriteria,
    teamName: teamName,
    bugs : [],
    changeRequests : [],
    features: [],
    userStories: []
  };
  console.log(myobj)
  db_connect.collection("Scenarios").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
 });

 scenarioRoutes.route("/edit/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      userId: req.body.userId,
      title: req.body.title,
      desciption: req.body.desciption,
      acceptanceCriteria: req.body.acceptanceCriteria,
      teamName,
    },
  };
  db_connect
    .collection("Scenarios")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
 });

 scenarioRoutes.route("/delete/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("Scenarios").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
 });
  
 export default scenarioRoutes;

