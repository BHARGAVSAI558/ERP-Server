import { feedback } from "../models/feedback.model.js";

export const feedback1 = async (req, res) => {
  try {
    await feedback.create({
      fName: req.body.fName,
      cName: req.body.cName,
      cSkills: req.body.cSkills,
    });
    
    res.json({
      msg: "created",
    });
  } catch (error) {
    res.json({
      msg: "error",
      data: error.message,
    });
  }
};

export const feedbackresult = async (req, res) => {
  const feed = await feedback.find({});
  res.json(feed);
};
