import { Router } from "express";
import ProjectController from "../controllers/projectController";

const projectRoute = Router();

projectRoute.get("/", ProjectController.getProjects);
projectRoute.post("/create", ProjectController.createProject);

export default projectRoute;
