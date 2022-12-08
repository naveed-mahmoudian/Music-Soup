// Imports
const router = require("express").Router();
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const ScSearcher = require("sc-searcher");
const scSearch = new ScSearcher();

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

    var client_id = process.env.CLIENT_ID;
    var query = keywords;
    var result_limit = 50;

    scSearch.init(client_id);

    scSearch.getTracks(query, result_limit).then((data) => {
      console.log(data);
      console.log(data.length);
      res.status(200).json(data);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
