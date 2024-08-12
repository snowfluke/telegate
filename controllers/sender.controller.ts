import { client } from "..";

import { NextFunction, Request, Response } from "../interfaces/base.interface";
import { STATUS } from "../utils/constant.util";
import { BadRequestError } from "../utils/error.util";
import { Helper } from "../utils/helper.util";

export const sendMsg = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content, id, async = "false" } = req.body;
    const helper = new Helper();

    if (!content) throw new BadRequestError("No message content provided!");
    if (!helper.isValidId(id))
      throw new BadRequestError("Id is not valid! Must be +62... or @username");

    if (async == "false") {
      await client.sendMsg(content, id);
    } else {
      client.sendMsg(content, id);
    }

    const result = {
      status: "success",
      code: 200,
      message: "Message sucessfully sent",
      data: {
        id,
        content,
        type: "text",
      },
    };
    res.status(STATUS.SUCCESS).json(result);
  } catch (error) {
    return next(error);
  }
};

export const sendMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content, id, async = "false" } = req.body;
    const helper = new Helper();

    if (!req.file) throw new BadRequestError("No file were provided!");
    if (!helper.isValidId(id))
      throw new BadRequestError("Id is not valid! Must be +62... or @username");

    if (async == "false") {
      await client.sendFile(
        content,
        id,
        req.file.buffer,
        req.file.originalname,
        req.file.size
      );
    } else {
      client.sendFile(
        content,
        id,
        req.file.buffer,
        req.file.originalname,
        req.file.size
      );
    }

    const result = {
      status: "success",
      code: 200,
      message: "Message sucessfully sent",
      data: {
        id,
        content,
        type: "media",
      },
    };

    res.status(STATUS.SUCCESS).json(result);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
