const express = require("express");
const {connectToMongoDb} = require('./connections');
const urlRoute = require('./routes/url.js');

const URL = require('./models/url.js');

const app = express();

const PORT = 8000;
const url = "mongodb://127.0.0.1:27017/short-url";
// connect to mongoDb
connectToMongoDb(url)
    .then( () => console.log("Mongo DB Connected") );


app.use(express.json()); // to parse the req body

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
    console.log("new req at ", Date.now(), "method : ", req.method);
    const shortId = req.params.shortId;
    console.log("Short ID : ", shortId);
    const entry = await URL.findOneAndUpdate( // chat gpt helped
      {
        shortId: shortId,
      },
      {
        $inc: { visits: 1 }, // Increment the visits field by 1
      },
      { new: true } // Return the updated document
    );
    
    if (!entry) {
      console.log("entry not found");
      return res.status(404).json({ error: "no such short id exists" });
    }
    
    console.log(entry);
    const redirectURL = entry.originalUrl;
    res.redirect(redirectURL); // there's an issue with this re direction
    // issue : if the original ID of a short id is not a url then 
    // when we try to redirect it , we end up sending ourself a new get request
    // so append "https://www." before "originalId" if "https://" does not already exists - above
  });

app.listen(PORT, () => {
    console.log("Server Listening At Port : ", PORT);
});


