import dotenv from "dotenv";
import { app } from "./app";
import { TelegateClient } from "./lib/telegate-client";
import logger from "./utils/log.util";

dotenv.config();
const PORT = process.env.PORT || 4321;
const API_ID = process.env.API_ID;
const API_HASH = process.env.API_HASH;
const SESSION = process.env.SESSION;

logger.info("Starting the server...");
let client: TelegateClient;

// Init
app.listen(PORT, async () => {
  logger.info("REST API is running on port " + PORT);

  if (API_ID && API_HASH && SESSION) {
    client = new TelegateClient(API_ID, API_HASH, SESSION);
  } else {
    throw Error("No telegram credentials was provided!");
  }

  logger.info("Starting the bot...");
  await client.init();
});

// Global error catch
process.once("unhandledRejection", async function (reason) {
  logger.error(reason);
});

process.once("uncaughtException", async function (err) {
  logger.error(err.message);
});

export { client };
