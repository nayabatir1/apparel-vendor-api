import express from "express";

import { checkLowestPrice, checkStock, updateStock } from "../controllers";
import { validate } from "../middleware";
import {
  checkLowestPricePayload,
  CheckStockPayload,
  UpdateStockPayload,
} from "../validations";
import {
  CheckLowestPriceSchema,
  CheckStockPayloadSchema,
  UpdateStockPayloadSchema,
} from "../validations/types";
import { catchAsync } from "../Utils";

const router = express.Router();

router.patch<{}, {}, UpdateStockPayloadSchema>(
  "/update-stock",
  validate<UpdateStockPayloadSchema[]>(UpdateStockPayload),
  catchAsync(updateStock)
);

router.post<{}, {}, CheckStockPayloadSchema>(
  "/check-stock",
  validate<CheckStockPayloadSchema[]>(CheckStockPayload),
  catchAsync(checkStock)
);

router.post<{}, {}, CheckLowestPriceSchema>(
  "/check-lowest-price",
  validate<CheckLowestPriceSchema[]>(checkLowestPricePayload),
  catchAsync(checkLowestPrice)
);

export default router;
