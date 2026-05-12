import { Router } from "express";
import { getStepsController, createStepController, deleteStepController, getStepsByRoadmapIdController, updateStepController, getStepByIdController } from "../controllers/step.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";


const stepRouter = Router()

stepRouter.get("/", isAuthenticated, getStepsController)
stepRouter.post("/create", isAuthenticated, createStepController)
stepRouter.delete("/delete/:id", isAuthenticated, deleteStepController)
stepRouter.get("/roadmap/:roadmapId", isAuthenticated, getStepsByRoadmapIdController)
stepRouter.patch("/update/:id", isAuthenticated, updateStepController)
stepRouter.get("/:id", isAuthenticated, getStepByIdController)

export default stepRouter