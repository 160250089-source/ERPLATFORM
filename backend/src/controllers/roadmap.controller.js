import roadMapModel from "../models/roadmap.model.js";
import stepModel from "../models/step.model.js";
import questionModel from "../models/questions.model.js";

export async function getRoadmapsController(req, res, next) {
    try {
        const roadmaps = await roadMapModel.find().lean();
        res.status(200).json({
            roadmaps
        })
    }
    catch (error) {
        next(error);
    }
}

export async function createRoadmapController(req, res, next) {
    try {
        const { title, description, category } = req.body;

        if (!title || !description || !category) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const roadMap = await roadMapModel.create({
            title,
            description,
            category
        })

        res.status(201).json({
            roadMap
        });
    }
    catch (error) {
        next(error);
    }
}

export async function deleteRoadmapController(req, res, next) {
    try {
        const { id } = req.params;
        const roadmap = await roadMapModel.findById(id);

        if(!roadmap) {
            return res.status(404).json({
                message: "Roadmap not found"
            })
        }

        // Get all steps of this roadmap
        const steps = await stepModel.find({ roadmapId: id });

        const stepIds = steps.map(step => step._id);

        // Delete ALL questions in ONE query
        if (stepIds.length > 0) {
            await questionModel.deleteMany({
                stepId: { $in: stepIds }
            });
        }

        // Delete all steps
        await stepModel.deleteMany({ roadmapId: id });

        // Delete roadmap
        await roadMapModel.findByIdAndDelete(id);

        res.status(200).json({
            message: "Roadmap deleted successfully"
        });
    }
    catch (error) {
        next(error);
    }    

}

export async function getRoadmapByIdController(req, res, next) {
    try {
        const { id } = req.params;

        const roadmap = await roadMapModel
        .findById(id)
        .lean()
        .populate({
            path: "steps",
            options: { sort: { order: 1 } },
            populate: {
                path: "questions"
            }
        });

        if (!roadmap) {
            return res.status(404).json({
                message: "Roadmap not found"
            })
        }
        res.status(200).json({
            roadmap
        })
    }
    catch (error) {
        next(error);
    }           
}

export async function updateRoadmapController(req, res, next) {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;

    const roadmap = await roadMapModel.findById(id);

    if (!roadmap) {
      return res.status(404).json({
        message: "Roadmap not found"
      });
    }

    // Safe updates
    if (title !== undefined) {
      roadmap.title = title;
    }

    if (description !== undefined) {
      roadmap.description = description;
    }

    if (category !== undefined) {
      roadmap.category = category;
    }

    await roadmap.save();

    res.status(200).json({
      roadmap
    });

  } catch (error) {
    next(error);
  }
}