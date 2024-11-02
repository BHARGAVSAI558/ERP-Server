import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  courseDetails: {
    type: String,
    required: true,
  },
});

const course = mongoose.model("course", courseSchema);
export { course };
