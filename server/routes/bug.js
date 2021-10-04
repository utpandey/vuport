const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Bug = mongoose.model("Bug");
const User = mongoose.model("User");
const serverConfig = require("../config");
const requireToken = require("../middlewares/requireToken");

// Multer

const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, new Date() + file.originalname);
    },
});

const upload = multer({ storage: storage });

//

// Create a bug
router.post("/user/create/bug", upload.single('image'), async(req, res) => {

    // console.log(req.file);
    console.log(req.body.reporter)
    const {
        title,
        description,
        project,
        severity,
        resolved,
        fixed,
        verfied,
        reporter,
        reportee,
    } = req.body;
    console.log(reporter)
    try {
        const bugObject = new Bug({
            title,
            description,
            project,
            severity,
            resolved,
            fixed,
            verfied,
            reporter,
            reportee,
        }); // , image: req.file.filename
        // await bugObject.save();
        // res.status(200).send(bugObject)
        await bugObject.save(function(err) {
            if (err) {
                res.status(401);
            }
            console.log(bugObject);
            var bugId = bugObject._id;
            // res.status(200).send(bugObject);
            res.status(200).send(bugObject);
        });
        // res.status(200).send({ visitorId: req.bugObject._id });
    } catch (err) {
        res.status(422).send(err.message);
        console.log(err);
    }
});

// send bug to respective reportee
router.post("/user/send/bug", async(req, res) => {
    const { reporteeId, bugObject } = req.body;
    try {
        User.findOneAndUpdate({ _id: reporteeId }, { $push: { bugs: bugObject } },
            function(error, success) {
                if (error) {
                    console.log(error);
                } else {
                    res.status(200);
                    res.send(success);
                    // console.log(success);
                }
            }
        );
    } catch (err) {
        res.status(422).send(err.message);
        console.log(err);
    }
});

// return reportee's bugs
router.post("/user/reportee/bug", async(req, res) => {
    const { reporteeId } = req.body;
    try {
        User.findOne({ _id: reporteeId }, function(error, obj) {
            if (error) {
                console.log(error);
            } else {
                // console.log(obj);
                var bugObj = obj.bugs;
                console.log(bugsObj);
                res.status(200).send(bugObj);
            }
        });
    } catch (err) {
        res.status(422).send(err.message);
        console.log(err);
    }
});

// resolve a bug
router.post("/user/bug/resolve", async(req, res) => {
    const { id } = req.body;
    console.log(id)
    try {
        Bug.findOneAndUpdate({ _id: id }, { $set: { resolved: true } },
            function(error, success) {
                if (error) {
                    console.log(error);
                } else {
                    res.status(200);
                    res.send(success);
                    // console.log(success);
                }
            }
        );
    } catch (err) {
        res.status(422).send(err.message);
        console.log(err);
    }
});

// fix a bug
router.post("/user/bug/fix", async(req, res) => {
    const { id } = req.body;

    try {
        Bug.findOneAndUpdate({ _id: id }, { $set: { fixed: true } },
            function(error, success) {
                if (error) {
                    console.log(error);
                } else {
                    res.status(200);
                    res.send(success);
                    // console.log(success);
                }
            }
        );
    } catch (err) {
        res.status(422).send(err.message);
        console.log(err);
    }
});

// verify a bug
router.post("/user/bug/verify", async(req, res) => {
    const { bugId } = req.body;

    try {
        Bug.findOneAndUpdate({ _id: bugId }, { $set: { verified: true } },
            function(error, success) {
                if (error) {
                    console.log(error);
                } else {
                    res.status(200);
                    res.send(success);
                    // console.log(success);
                }
            }
        );
    } catch (err) {
        res.status(422).send(err.message);
        console.log(err);
    }
});

// return all bugs
router.get("/user/bug/all", (req, res) => {
    Bug.find({}, function(err, bug) {
        var bugsMap = [];
        bug.forEach(function(bugs) {
            bugsMap.push(bugs);
            // bugsMap[visitor._id] = visitor;
        });
        console.log(bugsMap.length);
        res.send(bugsMap);
    });
});

module.exports = router;