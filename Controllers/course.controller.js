import { course } from "../models/Course.model.js";

export const createCourse = async (req, res) => {
  try {
    const { courseName, courseDetails } = req.body;

    if (!courseName || !courseDetails) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCourse = new course({
      courseName,
      courseDetails,
    });

    const savedCourse = await newCourse.save();

    res.status(201).json(savedCourse);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating course", error: err.message });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await course.find();
    res.status(200).json(courses);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching courses", error: err.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const deletedCourse = await course.findOneAndDelete({ _id: id });

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res
      .status(200)
      .json({ message: "Course deleted successfully", deletedCourse });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting course", error: err.message });
  }
};
