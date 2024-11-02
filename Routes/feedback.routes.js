import express from "express";
import {
  feedback1,
  feedbackresult,
} from "../Controllers/feedback.controller.js";

const router = express.Router();

router.post("/", feedback1);
router.get("/result", feedbackresult);

export default router;
