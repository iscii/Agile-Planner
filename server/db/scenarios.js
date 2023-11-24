import  {scenarios}  from "../config/mongoCollections.js";
// import { features } from "../../config/mongoCollections";
// import { userStories } from "../../config/mongoCollections";
import { ObjectId } from "mongodb"
export const create = async(
  userId,
  title,
  description,
  status,
  acceptanceCriteria,
  teamName,
  bugs = [],
  changeRequests = [],
  features = [],
  userStories = []
)=>{
  const scenarioCollection = await scenarios();
  const insertScenario = await scenarioCollection.insertOne({
    userId,
    title,
    description,
    status,
    acceptanceCriteria,
    teamName,
    bugs,
    changeRequests,
    features,
    userStories
  })
  if (!insertScenario.acknowledged) {
    throw new Error("Scenario could not be inserted.");
  }
  const scenarioID = insertScenario.insertedId.toString();
  const scenario = await get(scenarioID);
  return scenario;
}

const getAll = async () => {
  //Add userID to getAll by userId
  const scenarioCollection = await scenarios();
  const allScnearios = await scenarioCollection.find({}).toArray();
  if (!allScnearios) {
    throw new Error('Could not get all products.');
  }

  return allScnearios.map((element) => {
    element._id = element._id.toString();
    return element;
  });
};

const get = async (scenarioId) => {
  if (!scenarioId) {
    throw new Error("Missing scenario ID.");
  }
  if (typeof scenarioId !== 'string' || scenarioId.trim() === '') {
    throw new Error("Invalid scenario ID type.");
  }
  if (!ObjectId.isValid(scenarioId)) {
    throw new Error("Invalid scenario ID.");
  }

  const scenarioCollection = await scenarios();
  const scenario = await scenarioCollection.findOne({
    _id: new ObjectId(scenarioId),
  });

  if (!scenario) {
    throw new Error("No product with that ID.");
  }

  scenario._id = scenario._id.toString();
  return scenario;
};


export const updateBugs = async (
  scenarioID,
  title,
  description,
  status,
  acceptanceCriteria
  ) => {
  const scenarioCollection = await scenarios();
  const existingScenario = await get(scenarioID);

  if (!existingScenario) {
    throw new Error("Scenario not found.");
  }
  const newBug = { 
    _id: new ObjectId(),
    scenarioID: scenarioID,
    title: title,
    bug: description,
    status: status,
    acceptanceCriteria: acceptanceCriteria
  };
  const newBugsArray = existingScenario.bugs.concat(newBug);

  await scenarioCollection.updateOne(
    { _id: new ObjectId(scenarioID) },
    { $set: { bugs: newBugsArray } }
  );

  return await get(scenarioID);
};

export const updateFeatures = async (scenarioID, feature, title, acceptanceCriteria, status) => {
  const scenarioCollection = await scenarios();
  const existingScenario = await get(scenarioID);

  if (!existingScenario) {
    throw new Error("Scenario not found.");
  }

  const newFeature = { 
    _id: new ObjectId(),
    scenarioID: scenarioID, 
    feature: feature,
    title: title,
    status: status,
    acceptanceCriteria: acceptanceCriteria
  };

  const newFeaturesArray = existingScenario.features.concat(newFeature);

  await scenarioCollection.updateOne(
    { _id: new ObjectId(scenarioID) },
    { $set: { features: newFeaturesArray } }
  );

  return await get(scenarioID);
};

export const changeRequests = async (scenarioID, changeRequest,title, acceptanceCriteria, status) => {
  const scenarioCollection = await scenarios();
  const existingScenario = await get(scenarioID);

  if (!existingScenario) {
    throw new Error("Scenario not found.");
  }

  const newCR = { 
    _id: new ObjectId(), 
    scenarioID: scenarioID,
    title: title,
    changeRequest: changeRequest,
    acceptanceCriteria, acceptanceCriteria,
    status: status
  };

  const newCRArray = existingScenario.changeRequests.concat(newCR);

  await scenarioCollection.updateOne(
    { _id: new ObjectId(scenarioID) },
    { $set: { changeRequests: newCRArray } }
  );

  return await get(scenarioID);
};

export const updateUserStories = async (scenarioID, userStory,title, acceptanceCriteria, status) => {
  const scenarioCollection = await scenarios();
  const existingScenario = await get(scenarioID);

  if (!existingScenario) {
    throw new Error("Scenario not found.");
  }

  const newUS = { 
    _id: new ObjectId(), 
    scenarioID: scenarioID,
    title: title,
    userStory: userStory, 
    acceptanceCriteria: acceptanceCriteria,
    status: status
  };

  const newUSArray = existingScenario.userStories.concat(newUS);

  await scenarioCollection.updateOne(
    { _id: new ObjectId(scenarioID) },
    { $set: { userStories: newUSArray } }
  );
  return await get(scenarioID);
};

export const update = async (scenarioID, userId, title, description, status, acceptanceCriteria, teamName) => {
  const scenarioCollection = await scenarios();
  const existingScenario = await get(scenarioID);

  if (!existingScenario) {
    throw new Error("Scenario not found.");
  }

  const updatedFields = {};

  // Compare and update fields if they have changed
  if (userId !== existingScenario.userId) {
    updatedFields.userId = userId;
  }

  if (title !== existingScenario.title) {
    updatedFields.title = title;
  }

  if (description !== existingScenario.description) {
    updatedFields.description = description;
  }

  if (status !== existingScenario.status) {
    updatedFields.status = status;
  }

  if (acceptanceCriteria !== existingScenario.acceptanceCriteria) {
    updatedFields.acceptanceCriteria = acceptanceCriteria;
  }

  if (teamName !== existingScenario.teamName) {
    updatedFields.teamName = teamName;
  }


  // if (!existingScenario.bugs.includes(bug)) {
  //   const newBug = await updateBugs(scenarioID);
  //   updatedFields.bugs = existingScenario.bugs.concat(newBug);
  // }

  // if (!existingScenario.changeRequests.includes(changeRequest)) {
  //   const newCR = await changeRequests(scenarioID, changeRequest)
  //   updatedFields.changeRequests = existingScenario.changeRequests.concat(newCR);
  // }

  // if (!existingScenario.features.includes(feature)) {
  //   const newFeature = await updateFeatures(scenarioID,feature)
  //   updatedFields.features = existingScenario.features.concat(newFeature);
  // }

  // if (!existingScenario.userStories.includes(userStory)) {
  //   const newUS = await updateUserStories(scenarioID, userStory)
  //   updatedFields.userStories = existingScenario.userStories.concat(newUS);
  // }

  if (Object.keys(updatedFields).length === 0) {
    // No changes, return the existing scenario
    return existingScenario;
  }

  const updateResult = await scenarioCollection.updateOne(
    { _id: new ObjectId(scenarioID) },
    { $set: updatedFields }
  );

  if (updateResult.modifiedCount === 0) {
    throw new Error("Scenario update failed.");
  }

  return await get(scenarioID);
};

export const deleteScenario = async (scenarioID) => {
  const scenarioCollection = await scenarios();
  const deleteData = await scenarioCollection.deleteOne({ _id: new ObjectId(scenarioID) });

  if (deleteData.deletedCount === 0) {
    throw new Error("Scenario not found");
  }

  return deleteData;
}



