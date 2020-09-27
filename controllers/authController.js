const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');
const { KEY } = require("../configs/config");

module.exports.checkInput = function (req, res, next) {
    if (Object.keys(req.body).length == 0) {
        res.json({
            data: "Please enter data in POST request"
        })
    } else
        next();
}

module.exports.signup = async function (req, res) {
    try {

        //Create user in DB
        const user = await userModel.create(req.body);

        //Create token
        const id = user["_id"];//payload
        const token = await jwt.sign({ id }, KEY);

        //Send the token
        res.cookie("jwt", token, { httpOnly: true });
        res.json({
            success: "Successful signup",
            user: user
        })

    } catch (err) {
        res.json({ err });
    }
}

module.exports.login = async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            const dbPassword = user.password;
            // console.log(password);
            if (dbPassword == password) {
                const id = user["_id"];
                const token = await jwt.sign({ id }, KEY);
                res.cookie("jwt", token, { httpOnly: true })
                res.json({
                    success: "Successfull login",
                    user: user
                })
            } else {
                res.json({ data: "Wrong password" })
            }
        }else{
            res.json({data : "No such user exists"});
        }
    }
    catch (err) {
        res.json({ err })
    }
}

module.exports.protectRoute = async function (req, res, next) {
    try {
        //1. Get the token
        const headers = req.headers;
        if ((headers && headers.authorization) || (req.cookies && req.cookies.jwt)) {
            const token = req.cookies.jwt || headers.authorization.split(" ")[1];
            // console.log(token);
            //2. Verify the token
            var ans = await jwt.verify(token, KEY);// return type = string = _id
            //3. If verified, call next
            //4. find user

            if (ans) {
                const user = await userModel.findById(ans.id);
                req.user = user;
                next();
            } else
                res.json({ data: "Your token is tampered" });
        } else {
            res.json({ data: "Something went wrong" });

        }

    } catch (err) {
        console.log(err);
        res.json({ err })
    }
}

module.exports.logOut = function (req, res) {
    try {
        res.cookie("jwt", "dfjdskfjsdkl",
            {
                httpOnly: true,
                expires: new Date(Date.now())
            })
        res.redirect("/");
    } catch (err) {
        res.json({ err })
    }
}