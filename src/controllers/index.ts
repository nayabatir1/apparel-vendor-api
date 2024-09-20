import { Request, Response } from "express";
import status from "http-status";
import { Root } from "../validations/types";

export async function init({ body }: Request<{}, {}, Root>, res: Response) {
  res.status(status.OK).json({ message: "success", data: {} });
}
