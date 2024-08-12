const dotenv = require("dotenv");
const { TelegramClient } = require("telegram");
const { Logger, LogLevel } = require("telegram/extensions/Logger");
const { StringSession } = require("telegram/sessions");
const input = require("input");

dotenv.config();

async function generate() {
  const apiId = process.env.API_ID;
  const apiHash = process.env.API_HASH;
  const phoneNumber = process.env.PHONE_NUMBER;

  if (apiId && apiHash && phoneNumber) {
    const stringSession = new StringSession("");

    const client = new TelegramClient(stringSession, parseInt(apiId), apiHash, {
      baseLogger: new Logger(LogLevel.NONE),
    });

    await client.start({
      phoneNumber: async () => phoneNumber,
      password: async () => await input.text(`=> Enter password: `),
      phoneCode: async () => await input.text(`=> Enter OTP Code: `),
      onError: (err) => console.log(`Failed: ${err.message}`),
    });

    const session = client.session.save();
    await client.disconnect();

    console.log(`Your session: ${session}`);
  }
}

generate().catch((e) => console.error(e));
