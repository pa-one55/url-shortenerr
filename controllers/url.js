const shortid = require("shortid");
const URL = require("../models/url"); // importing the database

async function handleGenerateNewShortUrl(req,res){
    // put a check
    console.log("new req at ", Date.now(), "method : ", req.method);
    const body = req.body;
    console.log(body);
    if( !body.url ) return res.status(400).json({error: "Url is needed bro"});
    // now do the generaton thing
    const shortIdGenerated = shortid.generate();
    console.log("short id - ", shortIdGenerated);
    console.log("originalUrl = ",  body.url);
    // now put this in our database
    await URL.create({
        shortId: shortIdGenerated,
        originalUrl: body.url,
        visits: 0,
    });
    return res.json({ 
        yourLongUrl : body.url,
        yourShortUrl : shortIdGenerated,
    });
};

// export this function now

module.exports = {
    handleGenerateNewShortUrl,
}















// handleGenerateNewShortUrl("278"); // testing

// from documentation :
//Instantiate
// const uid = new ShortUniqueId();

// // Random UUID
// console.log(uid.rnd());

// // Sequential UUID
// console.log(uid.seq());