const express = require("express");
const mongoose = require("mongoose");
const Album = mongoose.model("Album");
const Image = mongoose.model("Image");
const router = express.Router();

// Create an Album
router.post("/album/add/:userId", async(req, res) => {
    const { title, images } = req.body;
    const user = req.params.userId;
    console.log(images)
    try {
        const albumObj = new Album({ user, title, images });
        await albumObj.save(function(err) {
            if (err) {
                res.status(401);
            }
            console.log(albumObj);
            // var pictureId = albumObj._id;
            // res.status(200).send(bugObject);
            res.status(200).send(albumObj);
        });
        // new Image(req.body).save()
        //     .then(saved => res.send(saved))
        //     .catch(next);
    } catch (err) {
        res.status(422).send(err.message);
        console.log(err);
    }
});

// Push to existing album
router.post("/album/update/:albumId", async(req, res) => {
    const { images } = req.body;
    const albumId = req.params.albumId;
    try {
        Album.findOneAndUpdate({ _id: albumId }, { $push: { images: images }, new: true },
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

// Lists out the users albums
router.get("/album/all/:userId", (req, res) => {
    const user = req.params.userId;
    try {
        Album.find({ user: user }, function(error, obj) {
            if (error) {
                console.log(error);
            } else {
                // console.log(obj);
                // var albumObj = obj.albums;
                res.status(200).json(obj);
            }
        });
    } catch (err) {
        res.status(422).send(err.message);
        console.log(err);
    }
    // Album.findByUser(req.params.userId)
    //     .then(albums => res.send(albums))
    //     .catch(next);
});

// GET album name and containing images
router.get("/album/:albumId/content", async(req, res) => {
    try {
        Album.findById(req.params.albumId)
            .then(function(result) {
                Image.find({ _id: result.images })
                    .then((response) => res.send(response));

            })
            // .exec(function(error, result) {
            //     console.log(result);
            //     res.status(200).send(result);
            // })
            // Album.findById(req.params.albumId).then((qwerty) => {
            //         console.log(qwerty);
            //         return Image.find({ album: req.params.albumId })
            //     })
            //     .then((image) =>
            //         console.log(image),
            //         res.status(200).send(image)
            //     );
    } catch (err) {
        res.status(422).send(err.message);
        console.log(err);
    }
    // try {
    //     Album.findById((req.params.albumId), Image.find({ album: req.params.albumId }), function(error, obj) {
    //         if (error) {
    //             console.log(error);
    //         } else {
    //             console.log(obj);
    //             // var albumObj = obj.albums;
    //             res.status(200).send(obj);
    //         }
    //     });
    // } catch (err) {
    //     res.status(422).send(err.message);
    //     console.log(err);
    // }
    // return Promise.all([
    //         Album.findById(req.params.albumId),
    //         Image.find({ album: req.params.albumId }),
    //     ])
    //     .then((albumContents) => res.send(albumContents[1]))
    //     .catch(next);
});

// router.put("/album/:id", (req, res, next) => {
//     Album.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//             runValidators: true,
//         })
//         .then((updated) => res.send(updated))
//         .catch(next);
// });

router.delete("/album/:id", (req, res, next) => {
    Image.find({ album: req.params.id })
        .remove()
        .then(() => {
            return Album.findByIdAndRemove(req.params.id);
        })
        .then((deleted) => res.send(deleted))
        .catch(next);
});

module.exports = router;