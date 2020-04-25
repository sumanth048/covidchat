const express = require("express");
const router = express.Router();
const g_authenticator = require("google-auth-library");
const config = require("../../hack2help-gefrcv-6d1032df1d6b.json");

const dialogflow = require('dialogflow');
const uuid = require('uuid');

router.use("/getDF", async (req, res, next) => {
    //console.log(req.body)
    let userQuest = req.body.userRequestQstn;
    projectId = config.project_id;
  // A unique identifier for the given session
  const sessionId = uuid.v4();

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
      keyFilename:"C:/Users/mdtha/Desktop/node_server_chat/hack2help-gefrcv-6d1032df1d6b.json"
  });
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
       // text: 'donate',
       text: userQuest,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  //console.log('Detected intent');
  //console.log(responses);

  const result = responses[0].queryResult;
  
  //console.log(`  Query: ${result.queryText}`);
  //console.log(`  Response: ${result.fulfillmentText}`);
  let dialogueFlowResponse = (`${result.fulfillmentText}`);
  //console.log(dialogueFlowResponse);
  if (result.intent) {
    //console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    //console.log(`  No intent matched.`);
  }

let payload={
    success:"ok",
    msg: dialogueFlowResponse
}
res.send(JSON.stringify(payload));
});

module.exports = router;