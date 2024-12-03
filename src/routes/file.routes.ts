import { Router } from "express";
import { uploadFiles } from "../controllers/file.controllers";

export const fileRouter = Router();

fileRouter.get("/", (req, res) => { });
fileRouter.post("/", uploadFiles);