//YOU WILL NEED TO CHANGE THE DB NAME TO MATCH THE REQUIRED DB NAME IN THE ASSIGNMENT SPECS!!!
import { config } from 'dotenv';

config({ path: './config.env' });

// console.log(process.env.ATLAS_URI)

export const mongoConfig = {
  // serverUrl: 'mongodb://localhost:27017',
  serverUrl: process.env.ATLAS_URI.toString(),
  database: 'CS-545-Project'
};
