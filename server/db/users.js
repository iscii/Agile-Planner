import {users} from '/Users/charlierome/Library/CloudStorage/GoogleDrive-jnatc1@gmail.com/My Drive/CS 545/CS-545-Project_v2/server/config/mongoCollections.js'
import { ObjectId } from "mongodb";
import bcrypt from 'bcrypt';

const saltRounds = 5;
export const createUser = async (userName, email, password) => {
  try {
    // Check if any of the parameters are missing
    if (!userName || !email || !password) {
      throw new Error("Please provide all required information.");
    }

    // Validate the email format using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email address.");
    }

    const collection = await users();
    const exists = await userExists(email);
    if (exists) {
      throw new Error("User already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = {
      username: userName,
      email: email,
      password: hashedPassword,
    };

    const result = await collection.insertOne(user);
    const newUser = await collection.findOne({
      _id: new ObjectId(result.insertedId),
    });    
    console.log(newUser);
    if (result.acknowledged) {
      return result.insertedId;
    } else {
      throw new Error("Failed to create user");
    }
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};


export const userExists = async (email) => {
  try {
    if (!email) {
      throw new Error("Please provide all required information.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email address.");
    }
    const collection = await users();
    const existingUser = await collection.findOne({ email });
    return !!existingUser;
  } catch (error) {
    throw new Error(`Error checking if user exists: ${error.message}`);
  }
};

export const deleteUser = async (email) => {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email address.");
    }
    const collection = await users();
    const result = await collection.deleteOne({ email });

    if (result.deletedCount === 1) {
      return true; // User was successfully deleted
    } else {
      return false; // User with the provided email was not found
    }
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

