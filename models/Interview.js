const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: String,
      userAnswer: String,
      score: Number,
      feedback: String,
      timestamp: Date,
    },
  ],
  totalScore: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: "in-progress",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Interview", interviewSchema);
