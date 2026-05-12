import stepModel from "../models/step.model.js";
import questionModel from "../models/questions.model.js";

export async function getStepsController(req, res, next) {
    try {
        const steps = await stepModel.find().lean();
        res.status(200).json({
            steps
        })
    }
    catch (error) {
        next(error);
    }   
} 


export async function createStepController(req, res, next) {
    try {
        const { title, content, roadmapId, resources } = req.body;

        if (!title || !content || !roadmapId) {
            return res.status(400).json({
                message: "Title, content and roadmapId are required"
            })
        }   

        const step = await stepModel.create({
            title,
            content,
            roadmapId,
            resources
        })

        res.status(201).json({
            step
        });
    }   
    catch (error) {
        next(error);
    }
}   


export async function deleteStepController(req, res, next) {
    try {
        const { id } = req.params;
        const step = await stepModel.findById(id);

        if(!step) {
            return res.status(404).json({
                message: "Step not found"
            })
        }

        // Delete all questions associated with the step
        await questionModel.deleteMany({ stepId: id });

        // Delete the step
        await stepModel.findByIdAndDelete(id);

        res.status(200).json({
            message: "Step deleted successfully"
        });
    }   
    catch (error) {
        next(error);
    }   
}    


export async function getStepsByRoadmapIdController(req, res, next) {
    try {
        const { roadmapId } = req.params;
        const steps = await stepModel.find({ roadmapId }).lean();
        res.status(200).json({
            steps
        })
    }
    catch (error) {
        next(error);
    }
}

export async function updateStepController(req, res, next) {
  try {
    const { id } = req.params;
    const { title, content, resources } = req.body;

    const step = await stepModel.findById(id);

    if (!step) {
      return res.status(404).json({
        message: "Step not found"
      });
    }

    if (title !== undefined) {
      step.title = title;
    }

    if (content !== undefined) {
      step.content = content;
    }

    // always keep resources as array
    if (resources !== undefined) {
      step.resources = Array.isArray(resources)
        ? resources
        : [resources];
    }

    await step.save();

    res.status(200).json({
      step
    });

  } catch (error) {
    next(error);
  }
}

export async function getStepByIdController(req, res, next) {
    try {
        const { id } = req.params;
        const step = await stepModel.findById(id).lean();

        if(!step) {
            return res.status(404).json({
                message: "Step not found"
            })
        }   

        res.status(200).json({
            step
        })
    }
    catch (error) {
        next(error);
    }
}
