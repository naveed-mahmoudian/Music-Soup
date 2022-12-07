// Imports
const router = require("express").Router();
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

// Routes
router.post("/", async (req, res) => {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Extract keywords from this text: " + req.body.brief,
      temperature: 0.5,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.8,
      presence_penalty: 0.0,
    });

    const keywords = response.data.choices[0].text;

    console.log(keywords);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
