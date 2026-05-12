import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

import mongoose from "mongoose";
import roadMapModel from "../models/roadmap.model.js";
import stepModel from "../models/step.model.js";
import questionModel from "../models/questions.model.js";

import roadmapData from "./fullstack.roadmap.json" with { type: "json" };
import questionsData from "./fullstack.questions.json" with { type: "json" };

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");

    // 🔥 Clear old data
    await roadMapModel.deleteMany({});
    await stepModel.deleteMany({});
    await questionModel.deleteMany({});
    console.log("Old data cleared");

    // ✅ Create roadmap
    const roadmap = await roadMapModel.create({
      title: roadmapData.title,
      description: roadmapData.description,
      category: roadmapData.category
    });

    console.log("Roadmap created");

    // 🧠 Step mapping
    const stepMap = {};

    // ✅ Insert steps WITH ORDER
    let index = 1;

    for (const step of roadmapData.steps) {
      const createdStep = await stepModel.create({
        title: step.title,
        content: step.content,
        roadmapId: roadmap._id,
        resources: step.resources || [],
        order: index++ // ✅ IMPORTANT
      });

      stepMap[step.title] = createdStep._id;
    }

    console.log("Steps inserted");

    // ✅ Prepare questions (bulk insert 🚀)
    const questionsToInsert = [];

    for (const stepQ of questionsData) {
      const stepId = stepMap[stepQ.stepTitle];

      if (!stepId) {
        console.warn(`Step not found for ${stepQ.stepTitle}`);
        continue;
      }

      for (const q of stepQ.questions) {
        questionsToInsert.push({
          question: q.type === "concept" ? q.question : q.title,
          answer: q.type === "concept" ? q.answer : q.description,
          roadMapId: roadmap._id,
          stepId: stepId,
          difficulty: q.difficulty || "easy",
          resources: [],
          type: q.type,
          testCases: q.testCases || [],
          constraints: q.constraints || "",
          inputFormat: q.inputFormat || "",
          outputFormat: q.outputFormat || ""
        });
      }
    }

    // 🚀 Insert all questions at once
    await questionModel.insertMany(questionsToInsert);

    console.log("Questions inserted ✅");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();