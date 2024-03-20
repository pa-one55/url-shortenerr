const  mongoose = require("mongoose");

// Schema banao
const urlSchema = new mongoose.Schema(
    {
        shortId:{
            type : String,
            required : true,
            unique : true,
        }, 
        originalUrl :{
            type : String,
            required : true,
        },
        visitHistory: [ // array hai ye - array of objects
            {
                timeStamp : { type : Number }
            }
        ],
    }, 
    {timeStamp : true}
);

// CREATE A MODEL
const URL = mongoose.model("url",urlSchema);
// now export
module.exports = URL;