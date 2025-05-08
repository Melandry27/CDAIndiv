import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import path from "path";
import adminRoutes from "./routes/admin.routes";
import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import exerciseRoutes from "./routes/exercise.routes";
import historyRoutes from "./routes/history.routes";
import sessionRoutes from "./routes/session.routes";
import userRoutes from "./routes/user.routes";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/histories", historyRoutes);
app.use("/api/categories", categoryRoutes);

export default app;
