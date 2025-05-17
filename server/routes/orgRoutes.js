import express from "express";
import {
  getSGdata,
  getNOdata,
  getAllPOdata,
  getPOdata,
} from "../controllers/orgController.js";

const orgRouter = express.Router();

orgRouter.get("/secretary-general", getSGdata);
orgRouter.get("/national-office/", getNOdata);
orgRouter.get("/provincial-offices", getAllPOdata);
orgRouter.get("/provincial-offices/:id", getPOdata);

export default orgRouter;
