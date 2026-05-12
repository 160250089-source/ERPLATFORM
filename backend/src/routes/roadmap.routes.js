import { Router } from 'express';
import { getRoadmapsController, createRoadmapController, deleteRoadmapController, getRoadmapByIdController, updateRoadmapController } from '../controllers/roadmap.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const roadmapRouter = Router()

roadmapRouter.get("/", isAuthenticated, getRoadmapsController)
roadmapRouter.post("/create", isAuthenticated, createRoadmapController)
roadmapRouter.delete("/delete/:id", isAuthenticated, deleteRoadmapController)
roadmapRouter.get("/:id", isAuthenticated, getRoadmapByIdController)
roadmapRouter.patch("/update/:id", isAuthenticated, updateRoadmapController)

export default roadmapRouter