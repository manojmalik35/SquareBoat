const express = require("express");
const app = express();
require("./models/connection");
const viewRouter = require("./routers/viewRouter");
const userRouter = require("./routers/userRouter");
const jobRouter = require("./routers/jobRouter");
const applicationRouter = require("./routers/applicationRouter");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended : true}));

app.use(express.static("public"));
app.use("/candidates", express.static("public"));
app.use("/jobs", express.static("public"));
app.set("view engine", "pug");
app.set("views", "views");

// app.use(function (req, res, next) {
//     console.log(req.cookies);
//     next();
// })

app.use("/", viewRouter);
app.use("/api/users", userRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/application", applicationRouter);

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is listening at port 3000")
})