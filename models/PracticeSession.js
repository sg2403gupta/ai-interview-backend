const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      "user-question",
      "ai-answer",
      "user-answer",
      "ai-question",
      "ai-feedback",
      "system",
    ],
  },
  content: String,
  score: Number,
  messageId: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const practiceSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    required: true,
    enum: ["ai-answers", "user-answers"],
  },
  messages: [messageSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ FIXED: Use async middleware style (NO next)
practiceSessionSchema.pre("save", async function () {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model("PracticeSession", practiceSessionSchema);
