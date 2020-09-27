const mongoose = require("mongoose");
const DB = process.env.DB;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((conn) => {
    // console.log(conn);
    console.log("DB connected");
}).catch(err=>{
    console.log(err);
})