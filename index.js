import express from "express";
import "dotenv/config";
import connectDB from "./Database/User.js";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import feedbackRouter from "./routes/feedback.routes.js";
import courseRouter from "./routes/course.routes.js";

const app = express();

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

connectDB()
  .then(() => {
    app.use("/api/auth", authRouter);
    app.use("/api/feedback", feedbackRouter);
    app.use("/api/courses", courseRouter);
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
  });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

app.listen(process.env.PORT || 3008, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
