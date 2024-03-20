const express = require("express");
const {connectToMongoDb} = require('./connections');
const urlRoute = require('./routes/url');

const URL = require('./models/url.js');

const app = express();

const PORT = 8001;
const url = "mongodb://127.0.0.1:27017/url-shortener";
// connect to mongoDb
connectToMongoDb(url)
    .then( () => console.log("Mongo DB Connected") );


app.use(express.json()); // to parse the req body

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    console.log(entry);
    const redirectURL = entry.originalUrl;
    res.redirect(redirectURL);
  });

app.listen(PORT, () => {
    console.log("Server Listening At Port : ", PORT);
});


