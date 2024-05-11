import express from "express";
import { connectDB } from "./configs/db";
import { PORT } from "./configs/config";
import { routeRole } from "./routes/roles.routes";
import { routeAuth } from "./routes/user.routes";

const app = express();
app.use(express.json());

//CONFIG
connectDB();

//routes
app.use("/api/v1/role", routeRole);
app.use("/api/v1/user", routeAuth);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
