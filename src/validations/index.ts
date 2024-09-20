import * as Joi from "joi";
import { Root } from "./types";

export const InitPayload = Joi.object<Root, true>().keys({});
