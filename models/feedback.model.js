import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
  },
  cName: {
    type: String,
    required: true,
  },
  cSkills: {
    type: String,
    required: true,
  },
});

const feedback = mongoose.model("Feedback", FeedbackSchema);
export { feedback };
