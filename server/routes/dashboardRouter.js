import express from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import upload from "../middlewares/fileUpload.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import {
  getSatatistics,
  getAllMembers,
  getAllOffices,
  getAllMessages,
  addMember,
  addOffice,
  deleteMember,
  deleteOffice,
  deleteMessage,
} from "../controllers/dashboardController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dashboardRouter = express.Router();
const publicDashboardPath = path.resolve(
  __dirname,
  "..",
  "public",
  "dashboard"
);

// This route will only use the authenticate middleware
dashboardRouter.get("/", authenticate, authorize, async (request, response) => {
  if (response.statusCode === 401) {
    return response.redirect(process.env.BACKEND_URL);
  }
  return response.sendFile(path.join(publicDashboardPath, "index.html"));
});

dashboardRouter.use(authenticate);
dashboardRouter.use(authorize);

dashboardRouter.get("/statics", getSatatistics);
dashboardRouter.get("/members", getAllMembers);
dashboardRouter.get("/offices", getAllOffices);
dashboardRouter.get("/messages", getAllMessages);

dashboardRouter.post("/member", upload.single("avatar"), addMember);
dashboardRouter.post("/office", upload.single("cover"), addOffice);

dashboardRouter.delete("/member/:id", deleteMember);
dashboardRouter.delete("/office/:id", deleteOffice);
dashboardRouter.delete("/message/:id", deleteMessage);

dashboardRouter.use((request, response, next) => {
  response.redirect("http://localhost:3000/");
});

export default dashboardRouter;
