const express = require("express");
const auth = require("../middleware/auth");
const aiService = require("../services/aiService");
const PracticeSession = require("../models/PracticeSession");

const router = express.Router();

// @route   POST /api/practice/start-session
// @desc    Start new practice session
// @access  Private
router.post("/start-session", auth, async (req, res) => {
  try {
    const { topic, mode } = req.body;

    if (!topic || !mode) {
      return res.status(400).json({ message: "Please provide topic and mode" });
    }

    const session = new PracticeSession({
      userId: req.user.userId,
      topic,
      mode,
      messages: [],
    });

    await session.save();

    res.json({ sessionId: session._id });
  } catch (err) {
    console.error("Start session error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/practice/generate-question
// @desc    Generate question based on topic
// @access  Private
router.post("/generate-question", auth, async (req, res) => {
  try {
    const { sessionId, topic, previousQuestions } = req.body;

    const question = await aiService.generateTopicQuestion(
      topic,
      previousQuestions || []
    );

    if (sessionId) {
      await PracticeSession.findByIdAndUpdate(sessionId, {
        $push: {
          messages: {
            type: "ai-question",
            content: question,
            timestamp: new Date(),
          },
        },
        updatedAt: new Date(),
      });
    }

    res.json({ question });
  } catch (err) {
    console.error("Generate question error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/practice/answer-question
// @desc    Get AI answer for user's question
// @access  Private
router.post("/answer-question", auth, async (req, res) => {
  try {
    const { sessionId, question, topic } = req.body;

    const answer = await aiService.answerQuestion(question, topic);
    const messageId = `msg_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    if (sessionId) {
      await PracticeSession.findByIdAndUpdate(sessionId, {
        $push: {
          messages: [
            {
              type: "user-question",
              content: question,
              timestamp: new Date(),
            },
            {
              type: "ai-answer",
              content: answer,
              messageId,
              timestamp: new Date(),
            },
          ],
        },
        updatedAt: new Date(),
      });
    }

    res.json({ answer, messageId });
  } catch (err) {
    console.error("Answer question error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/practice/evaluate-answer
// @desc    Evaluate user's answer
// @access  Private
router.post("/evaluate-answer", auth, async (req, res) => {
  try {
    const { sessionId, question, answer } = req.body;

    const evaluation = await aiService.evaluateAnswer(question, answer);

    if (sessionId) {
      await PracticeSession.findByIdAndUpdate(sessionId, {
        $push: {
          messages: [
            {
              type: "user-answer",
              content: answer,
              timestamp: new Date(),
            },
            {
              type: "ai-feedback",
              content: evaluation.feedback,
              score: evaluation.score,
              timestamp: new Date(),
            },
          ],
        },
        updatedAt: new Date(),
      });
    }

    res.json(evaluation);
  } catch (err) {
    console.error("Evaluate answer error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/practice/modify-answer
// @desc    Modify AI answer
// @access  Private
router.post("/modify-answer", auth, async (req, res) => {
  try {
    const { sessionId, messageId, instruction } = req.body;

    const session = await PracticeSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const message = session.messages.find((m) => m.messageId === messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    const modifiedAnswer = await aiService.modifyAnswer(
      message.content,
      instruction
    );

    await PracticeSession.findOneAndUpdate(
      { _id: sessionId, "messages.messageId": messageId },
      {
        $set: {
          "messages.$.content": modifiedAnswer,
          updatedAt: new Date(),
        },
      }
    );

    res.json({ modifiedAnswer });
  } catch (err) {
    console.error("Modify answer error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/practice/history
// @desc    Get user's practice history
// @access  Private
router.get("/history", auth, async (req, res) => {
  try {
    const sessions = await PracticeSession.find({ userId: req.user.userId })
      .sort({ updatedAt: -1 })
      .limit(20);

    res.json(sessions);
  } catch (err) {
    console.error("Get history error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   DELETE /api/practice/session/:sessionId
// @desc    Delete a practice session
// @access  Private
router.delete("/session/:sessionId", auth, async (req, res) => {
  try {
    const session = await PracticeSession.findOne({
      _id: req.params.sessionId,
      userId: req.user.userId,
    });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    await PracticeSession.findByIdAndDelete(req.params.sessionId);

    res.json({ message: "Session deleted successfully" });
  } catch (err) {
    console.error("Delete session error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
