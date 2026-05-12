import { Router } from "express";
import { getQuestionsController, createQuestionController, deleteQuestionController, getQuestionsByStepIdController, getQuestionsByRoadmapIdController, updateQuestionController, getQuestionByIdController } from "../controllers/question.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";


const questionRouter = Router()


questionRouter.get("/", isAuthenticated, getQuestionsController)
questionRouter.post("/create", isAuthenticated, createQuestionController)
questionRouter.delete("/delete/:id", isAuthenticated, deleteQuestionController)
questionRouter.get("/step/:stepId", isAuthenticated, getQuestionsByStepIdController)
questionRouter.get("/roadmap/:roadMapId", isAuthenticated, getQuestionsByRoadmapIdController)
questionRouter.patch("/update/:id", isAuthenticated, updateQuestionController)
questionRouter.get("/:id", isAuthenticated, getQuestionByIdController)



export default questionRouter