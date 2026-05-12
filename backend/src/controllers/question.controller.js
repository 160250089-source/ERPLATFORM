import questionModel from "../models/questions.model.js";

export async function getQuestionsController(req, res, next) {
  try {
    const { type } = req.query;

    const filter = type ? { type } : {};

    const questions = await questionModel.find(filter).lean();

    if (!questions.length) {
      return res.status(404).json({
        message: "No questions found"
      });
    }

    res.status(200).json({
      questions
    });
  } catch (error) {
    next(error);
  }
}

export async function createQuestionController(req, res, next) {
  try {
    const {
      question,
      answer,
      roadMapId,
      stepId,
      difficulty,
      resources,
      type,
      testCases,
      inputFormat,
      outputFormat,
      constraints
    } = req.body;

    if (!question || !roadMapId || !stepId) {
      return res.status(400).json({
        message: "Required fields missing"
      });
    }

    const formattedResources = Array.isArray(resources)
      ? resources
      : resources
      ? [resources]
      : [];

    const newQuestion = await questionModel.create({
      question,
      answer,
      roadMapId,
      stepId,
      difficulty,
      resources: formattedResources,
      type,
      testCases,
      inputFormat,
      outputFormat,
      constraints
    });

    res.status(201).json({
      message: "Question created successfully",
      question: newQuestion
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteQuestionController(req, res, next) {
  try {
    const { id } = req.params;

    const question = await questionModel.findById(id);

    if (!question) {
      return res.status(404).json({
        message: "Question not found"
      });
    }

    await questionModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Question deleted successfully"
    });
  } catch (error) {
    next(error);
  }
}

export async function getQuestionsByStepIdController(req, res, next) {
  try {
    const { stepId } = req.params;

    const questions = await questionModel.find({ stepId }).lean();

    if (!questions.length) {
      return res.status(404).json({
        message: "No questions found for this step"
      });
    }

    res.status(200).json({
      questions
    });
  } catch (error) {
    next(error);
  }
}

export async function getQuestionsByRoadmapIdController(req, res, next) {
  try {
    const { roadMapId } = req.params;

    const questions = await questionModel.find({ roadMapId }).lean();

    if (!questions.length) {
      return res.status(404).json({
        message: "No questions found for this roadmap"
      });
    }

    res.status(200).json({
      questions
    });
  } catch (error) {
    next(error);
  }
}

export async function updateQuestionController(req, res, next) {
  try {
    const { id } = req.params;

    const {
      question,
      answer,
      difficulty,
      resources,
      type,
      testCases,
      inputFormat,
      outputFormat,
      constraints
    } = req.body;

    const existingQuestion = await questionModel.findById(id);

    if (!existingQuestion) {
      return res.status(404).json({
        message: "Question not found"
      });
    }

    if (question !== undefined) {
      existingQuestion.question = question;
    }

    if (answer !== undefined) {
      existingQuestion.answer = answer;
    }

    if (difficulty !== undefined) {
      existingQuestion.difficulty = difficulty;
    }

    if (resources !== undefined) {
      existingQuestion.resources = Array.isArray(resources)
        ? resources
        : [resources];
    }

    if (type !== undefined) {
      existingQuestion.type = type;
    }

    if (testCases !== undefined) {
      existingQuestion.testCases = testCases;
    }

    if (inputFormat !== undefined) {
      existingQuestion.inputFormat = inputFormat;
    }

    if (outputFormat !== undefined) {
      existingQuestion.outputFormat = outputFormat;
    }

    if (constraints !== undefined) {
      existingQuestion.constraints = constraints;
    }

    await existingQuestion.save();

    res.status(200).json({
      message: "Question updated successfully",
      question: existingQuestion
    });
  } catch (error) {
    next(error);
  }
}

export async function getQuestionByIdController(req, res, next) {
  try {
    const { id } = req.params;

    const question = await questionModel.findById(id).lean();

    if (!question) {
      return res.status(404).json({
        message: "Question not found"
      });
    }

    res.status(200).json({
      question
    });
  } catch (error) {
    next(error);
  }
}