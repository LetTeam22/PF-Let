const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);


const testingApiGPT = async (req, res) => {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `
                hola, como estas?              
            `,
            temperature: 0.6,
            max_tokens:100
          });
          res.status(200).json({ result: response.data.choices[0].text });
    } catch (error) {
        res.send({msg: error})
    }
}

module.exports = {
    testingApiGPT
}