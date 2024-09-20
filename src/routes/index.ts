import express from "express";

import { init } from "../controllers";
import { validate } from "../middleware";
import { InitPayload } from "../validations";
import { Root } from "../validations/types";

const router = express.Router();

router.post<{}, {}, Root>("/", validate(InitPayload), init);

export default router;
