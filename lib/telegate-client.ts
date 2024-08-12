import { StringSession } from "telegram/sessions";
import { Helper } from "../utils/helper.util";
import logger from "../utils/log.util";

import { Logger, TelegramClient } from "telegram";
import { UserAuthParams } from "telegram/client/auth";
import { CustomFile } from "telegram/client/uploads";
import { LogLevel } from "telegram/extensions/Logger";

export class TelegateClient {
  private client: TelegramClient;
  constructor(
    apiId: string,
    apiHash: string,
    session: string,
    private helper = new Helper()
  ) {
    let stringSession = new StringSession(session);

    this.client = new TelegramClient(stringSession, parseInt(apiId), apiHash, {
      baseLogger: new Logger(LogLevel.NONE),
    });
  }

  async init() {
    this.setup();

    await this.client.start({} as UserAuthParams);
    logger.info("The bot is ready");
  }

  setup() {}

  async sendMsg(msg: string, to: string) {
    // await this.helper.delay();

    await this.client.sendMessage(to, { message: msg });
  }

  async sendFile(
    msg: string = "",
    to: string,
    buffer: Buffer,
    name: string,
    size: number
  ) {
    // await this.helper.delay();

    const file = new CustomFile(name, size, "", buffer);
    await this.client.sendFile(to, {
      file,
      caption: msg,
      forceDocument: false,
    });
  }
}
