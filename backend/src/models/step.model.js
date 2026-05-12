import mongoose from "mongoose";

const stepSchema = new mongoose.Schema(
  {
    title: String,

    content: String,

    roadmapId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoadMap",
    },

    resources: [String],

    // ✅ REQUIRED ADDITION
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  },
);

stepSchema.virtual("questions", {
  ref: "Question",
  localField: "_id",
  foreignField: "stepId"
});

const stepModel = mongoose.model("Step", stepSchema);

export default stepModel;
