import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  // 🔹 Common fields
  question: String,   // for concept OR coding title
  answer: String,     // concept answer OR coding description

  roadMapId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoadMap',
    required: true
  },

  stepId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Step',
    required: true
  },

  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  },

  resources: [String],

  // 🔥 NEW FIELDS (VERY IMPORTANT)

  type: {
    type: String,
    enum: ["concept", "coding"],
    default: "concept"
  },

  inputFormat: String,
  outputFormat: String,
  constraints: String,

  testCases: [
    {
      input: String,
      output: String
    }
  ]

}, { timestamps: true });

const questionModel = mongoose.model('Question', questionSchema);

export default questionModel;