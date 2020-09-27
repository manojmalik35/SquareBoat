const mongoose = require("mongoose");
const { DB } = require("../configs/config");

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((conn) => {
    // console.log(conn);
    console.log("DB connected");
}).catch(err=>{
    console.log(err);
})