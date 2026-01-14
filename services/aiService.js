const axios = require("axios");

class AIService {
  constructor() {
    // Use direct IP for stability on Windows
    this.ollamaUrl = process.env.OLLAMA_API_URL || "http://127.0.0.1:11434";
    this.model = "phi3:mini";
  }

  // Generate question based on topic
  async generateTopicQuestion(topic, previousQuestions = []) {
    const prompt = `You are an experienced technical interviewer. Generate ONE challenging interview question about: ${topic}

${
  previousQuestions.length > 0
    ? `Previously asked questions:\n${previousQuestions.join(
        "\n"
      )}\n\nMake sure to ask something different.`
    : ""
}

Requirements:
- Make it practical and scenario-based
- Suitable for a technical interview
- Clear and concise
- Return ONLY the question, no explanations

Question:`;

    try {
      console.log("🧠 AI: Generating topic question...");

      const response = await axios.post(
        `${this.ollamaUrl}/api/generate`,
        {
          model: this.model,
          prompt,
          stream: false,
          options: { temperature: 0.8, num_predict: 200 },
        },
        {
          timeout: 180000, // ⏳ 3 minutes
        }
      );

      console.log("🤖 Ollama response received");
      return response.data.response.trim();
    } catch (error) {
      console.error("❌ Ollama generateTopicQuestion error:", error.message);
      return this.getFallbackTopicQuestion(topic);
    }
  }

  // Answer user's question
  async answerQuestion(question, topic) {
    const prompt = `You are an expert interviewer and educator.

Topic: ${topic}
Question: ${question}

Provide a comprehensive answer that:
1. Explains clearly
2. Includes examples
3. Mentions best practices
4. Covers pitfalls
5. Is structured

Answer:`;

    try {
      console.log("🧠 AI: Answering question...");

      const response = await axios.post(
        `${this.ollamaUrl}/api/generate`,
        {
          model: this.model,
          prompt,
          stream: false,
          options: { temperature: 0.7, num_predict: 500 },
        },
        {
          timeout: 180000,
        }
      );

      console.log("🤖 Ollama response received");
      return response.data.response.trim();
    } catch (error) {
      console.error("❌ Ollama answerQuestion error:", error.message);
      return this.getFallbackAnswer(question);
    }
  }

  // Evaluate user's answer
  async evaluateAnswer(question, answer) {
    const prompt = `Evaluate this answer.

Question: ${question}
Answer: ${answer}

Provide:
Score: [0-100]
Feedback: [2-3 sentences constructive feedback]`;

    try {
      console.log("🧠 AI: Evaluating answer...");

      const response = await axios.post(
        `${this.ollamaUrl}/api/generate`,
        {
          model: this.model,
          prompt,
          stream: false,
          options: { temperature: 0.3, num_predict: 300 },
        },
        {
          timeout: 180000,
        }
      );

      console.log("🤖 Ollama evaluation received");
      return this.parseEvaluation(response.data.response);
    } catch (error) {
      console.error("❌ Ollama evaluateAnswer error:", error.message);
      return this.ruleBasedEvaluation(question, answer);
    }
  }

  // Modify AI answer
  async modifyAnswer(originalAnswer, instruction) {
    const prompt = `Modify the following answer based on the user's instruction.

Original Answer:
${originalAnswer}

Instruction:
${instruction}

Modified Answer:`;

    try {
      console.log("🧠 AI: Modifying answer...");

      const response = await axios.post(
        `${this.ollamaUrl}/api/generate`,
        {
          model: this.model,
          prompt,
          stream: false,
          options: { temperature: 0.7, num_predict: 500 },
        },
        {
          timeout: 180000,
        }
      );

      console.log("🤖 Ollama modification received");
      return response.data.response.trim();
    } catch (error) {
      console.error("❌ Ollama modifyAnswer error:", error.message);
      return originalAnswer + "\n\n(Modified based on your request)";
    }
  }

  // Parse evaluation response
  parseEvaluation(response) {
    const scoreMatch = response.match(/Score:\s*(\d+)/i);
    const feedbackMatch = response.match(/Feedback:\s*(.+)/is);

    const score = scoreMatch ? parseInt(scoreMatch[1]) : 50;
    const feedback = feedbackMatch
      ? feedbackMatch[1].trim()
      : "Good effort! Keep practicing.";

    return { score: Math.min(100, Math.max(0, score)), feedback };
  }

  // Rule-based evaluation fallback
  ruleBasedEvaluation(question, answer) {
    const answerLength = answer.trim().split(/\s+/).length;
    let score = 30;
    if (answerLength > 10) score += 20;
    if (answerLength > 30) score += 20;

    const feedback =
      score >= 70
        ? "Great answer! You covered the key points well."
        : score >= 50
        ? "Good attempt. Add more detail and examples."
        : "Try to elaborate more and include specific examples.";

    return { score, feedback };
  }

  // Fallbacks (unchanged)
  getFallbackTopicQuestion(topic) {
    return `Explain the key concepts and best practices in ${topic}. What are common challenges developers face?`;
  }

  getFallbackAnswer() {
    return "This is a good question. Try to focus on core concepts, practical usage, best practices, and common pitfalls.";
  }
}

module.exports = new AIService();
