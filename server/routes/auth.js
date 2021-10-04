const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const serverConfig = require("../config");
const requireToken = require("../middlewares/requireToken");

// signup user
router.post("/user/signup", async(req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        const user = new User({ email, password, firstName, lastName });
        await user.save();
        const id = user._id;
        const token = jwt.sign({ userId: user._id }, serverConfig.jwtKey);
        const { firstName, lastName } = user;
        res.send({ token, id, firstName, lastName });
    } catch (err) {
        res.status(422).send(err.message);
        console.log(err);
    }
});

// signin user
router.post("/user/signin", async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).send({ error: "Must provide email or password" });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(422).send({ error: "Must provide email or password" });
    }

    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, serverConfig.jwtKey);
        const id = user._id;
        const { firstName, lastName } = user;
        res.send({ token, id, firstName, lastName });
    } catch (err) {
        console.log(err);
        return res.status(422).send({ error: "Must provide email or password" });
    }
});

router.get("/", requireToken, (req, res) => {
    res.send({ email: req.user.email });
});

module.exports = router;