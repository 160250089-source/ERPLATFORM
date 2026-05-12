import mongoose from "mongoose";

const roadMapSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  },
);

roadMapSchema.virtual("steps", {
  ref: "Step",             
  localField: "_id",       
  foreignField: "roadmapId" 
});

const roadMapModel = mongoose.model("RoadMap", roadMapSchema);

export default roadMapModel;