const http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const dialogflow = require('dialogflow');
const uuid = require('uuid');


//  async function runSample(idArg) {
  
// }

app.use(cors());

app.use(
  express.json({
    extended: false
  })
);
app.use(bodyParser.json());

const getDF = require("./routes/api/getDF");
app.use(getDF);



/*test*/


//app.use(getScenario1SavedData);
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`arrow server started on port ${PORT}`);
});
