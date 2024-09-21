import * as Joi from "joi";
import {
  UpdateStockPayloadSchema,
  Quality,
  Size,
  CheckStockPayloadSchema,
  CheckLowestPriceSchema,
  Sizes,
} from "./types";

export const UpdateStockPayload = Joi.array<UpdateStockPayloadSchema[]>()
  .min(1)
  .items(
    Joi.object<UpdateStockPayloadSchema, true>().keys({
      code: Joi.string().trim().required(),
      size: Joi.string()
        .trim()
        .valid(...Object.values(Size)),
      quantity: Joi.number().integer().positive().required(),
      quality: Joi.string()
        .trim()
        .valid(...Object.values(Quality))
        .required(),
      pricePerUnit: Joi.number().positive(),
    })
  );

const sizesSchema = Joi.object<Sizes, true>().keys({
  L: Joi.number().integer().positive(),
  M: Joi.number().integer().positive(),
  S: Joi.number().integer().positive(),
});

export const CheckStockPayload = Joi.array<CheckStockPayloadSchema[]>()
  .min(1)
  .items(
    Joi.object<CheckStockPayloadSchema, true>().keys({
      code: Joi.string().trim().required(),
      quality: Joi.string()
        .trim()
        .valid(...Object.values(Quality))
        .required(),
      sizes: sizesSchema,
    })
  );

export const checkLowestPricePayload = Joi.array<CheckLowestPriceSchema[]>()
  .min(1)
  .items(
    Joi.object<CheckLowestPriceSchema>().keys({
      code: Joi.string().trim().required(),
      sizes: sizesSchema,
    })
  );
