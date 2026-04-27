import express from "express";
import cors from "cors";
import waitlistRoutes from "./routes/waitlist.js";
import postRoutes from "./routes/posts.js";

const app = express();

// ✅ CORS
const allowedOrigins = [
  "https://nnyocha.com",
  "https://www.nnyocha.com",
  "http://localhost:5173",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (!allowedOrigins.includes(origin)) {
        return callback(
          new Error("CORS policy does not allow this origin."),
          false
        );
      }
      callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "OPTIONS"], // <-- add PATCH
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ JSON parser
app.use(express.json());

// ✅ Routes
app.use("/api/waitlist", waitlistRoutes);
app.use("/api/posts", postRoutes);

export default app;
