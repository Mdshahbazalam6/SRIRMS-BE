
import { connectToDB } from "./config/mongoose";
import { Logger } from "./common/logger";
import app from "./config/express";
import { Config } from "./config/env";
import { createFirstregister } from "./controllers/auth.controller";

const dbConnetionn = connectToDB();

dbConnetionn.on('connected', () => {
  Logger.info(`[database]: MongoDB connected`)
});

dbConnetionn.on('disconnected', (err: any) => {
  Logger.error(`[database]: MongoDB got disConnected ${err}`);
  process.exit(-1);
});

dbConnetionn.on('error', (err: any) => {
  Logger.error(`[database]: Failed to connect to MongoDB ${err.message}`);
  process.exit(-1);
});

app.listen(Config.PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${Config.PORT}`);
  // createFirstregister();
});