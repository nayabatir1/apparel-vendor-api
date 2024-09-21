import { Request, Response } from "express";
import status from "http-status";
import {
  CheckLowestPriceSchema,
  CheckStockPayloadSchema,
  UpdateStockPayloadSchema,
} from "../validations/types";
import {
  checkLowestPriceService,
  checkStockService,
  updateStockService,
} from "../services";

export async function updateStock(
  { body }: Request<{}, {}, UpdateStockPayloadSchema[]>,
  res: Response
) {
  await updateStockService(body);

  res.status(status.OK).json({ message: "Stock updated Successfully" });
}

export async function checkStock(
  { body }: Request<{}, {}, CheckStockPayloadSchema[]>,
  res: Response
) {
  await checkStockService(body);

  res.status(status.OK).json({ message: "Sufficient stock available" });
}

export async function checkLowestPrice(
  { body }: Request<{}, {}, CheckLowestPriceSchema[]>,
  res: Response
) {
  const message = await checkLowestPriceService(body);

  res.status(status.OK).json({ message });
}
