import express from 'express'
import cors from 'cors'
import { config } from 'dotenv';
import { connectToServer, getDb } from './db/conn.js'; 
import scenarioRoutes from './routes/scenario.js'; 
const app = express();
config({ path: './config.env' });
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(scenarioRoutes);

app.listen(port, () => {
  connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});