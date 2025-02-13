const axios = require("axios");
const {OK, INTERNAL_SERVER_ERROR} = require("../constants/errorCode");



exports.assesTest = async (req, res) => {

    try{
        const {responses} = req.body;

        const prompt = `
      Given these responses from a user about their mental health:
      ${responses.map((r, i) => `${i + 1}. ${r.que} - ${r.ans} `).join("\n")}
      
      Categorize them into the following:
      - Depression Support
      - Anxiety Management
      - Adult ADHD Therapy
      - Social Anxiety Support
      - Women’s Mental Health
      
      return identified mental issue in bellow JSON format and return only one object
      
      {
        identifiedIssue : 'Issue'
      }
    `;

        // const aiResponse = await axios.post(
        //     "https://api.openai.com/v1/chat/completions",
        //     {
        //         model: "gpt-4o",
        //         messages: [{ role: "user", content: prompt }],
        //     },
        //     { headers: { Authorization: `Bearer ${OPEN_AI_KEY}` } }
        // );

        const aiResponse = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GOOGLE_API_KEY}`,
            { contents: [{ parts: [{ text: prompt }] }] }
        );

        // const answerResponse = aiResponse.data.choices[0].message.content;
        let answerResponse = aiResponse?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

        // answerResponse = answerResponse.substring(answerResponse.indexOf('{'), answerResponse.indexOf('}') + 1)

        console.log(answerResponse);

        return res.status(OK).send({status: OK, message: 'Assesment Successfull', response: answerResponse});
    }catch(err){
        console.log(err);
        return res.status(OK).send({status: INTERNAL_SERVER_ERROR, message: 'Something went wrong',error: err});
    }

}