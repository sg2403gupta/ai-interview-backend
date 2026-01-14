const express = require("express");
const auth = require("../middleware/auth");
const Interview = require("../models/Interview");
const aiService = require("../services/aiService");

const router = express.Router();

// @route   POST /api/interview/start
// @desc    Start new interview
// @access  Private
router.post("/start", auth, async (req, res) => {
  try {
    const { role, difficulty } = req.body;

    if (!role || !difficulty) {
      return res
        .status(400)
        .json({ message: "Please provide role and difficulty" });
    }

    const interview = new Interview({
      userId: req.user.userId,
      role,
      difficulty,
      questions: [],
    });

    await interview.save();

    res.json({ interviewId: interview._id });
  } catch (err) {
    console.error("Start interview error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/interview/:interviewId/question
// @desc    Get next question
// @access  Private
router.get("/:interviewId/question", auth, async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.interviewId);

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    if (interview.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const previousQuestions = interview.questions.map((q) => q.question);
    const question = await aiService.generateQuestion(
      interview.role,
      interview.difficulty,
      previousQuestions
    );

    res.json({
      question,
      questionNumber: interview.questions.length + 1,
    });
  } catch (err) {
    console.error("Get question error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/interview/:interviewId/answer
// @desc    Submit answer
// @access  Private
router.post("/:interviewId/answer", auth, async (req, res) => {
  try {
    const { question, answer } = req.body;
    const interview = await Interview.findById(req.params.interviewId);

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    if (interview.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const evaluation = await aiService.evaluateAnswer(question, answer);

    interview.questions.push({
      question,
      userAnswer: answer,
      score: evaluation.score,
      feedback: evaluation.feedback,
      timestamp: new Date(),
    });

    interview.totalScore = Math.round(
      interview.questions.reduce((sum, q) => sum + q.score, 0) /
        interview.questions.length
    );

    await interview.save();

    res.json(evaluation);
  } catch (err) {
    console.error("Submit answer error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/interview/:interviewId/complete
// @desc    Complete interview
// @access  Private
router.post("/:interviewId/complete", auth, async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.interviewId);

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    if (interview.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    interview.status = "completed";
    await interview.save();

    res.json({
      totalScore: interview.totalScore,
      questionsAnswered: interview.questions.length,
      interview,
    });
  } catch (err) {
    console.error("Complete interview error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/interview/history
// @desc    Get user's interview history
// @access  Private
router.get("/history", auth, async (req, res) => {
  try {
    const interviews = await Interview.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(interviews);
  } catch (err) {
    console.error("Get history error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
