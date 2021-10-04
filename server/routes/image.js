const express = require('express');
const mongoose = require("mongoose");
const Image = mongoose.model('Image');
const router = express.Router();

// create a picture
router.post('/picture/add/:userId', async(req, res) => {
    const link = req.body.link;
    const user = req.params.userId;
    try {
        const pictureObj = new Image({ link, user });
        await pictureObj.save(function(err) {
            if (err) {
                res.status(401);
            }
            // console.log(pictureObj);
            res.status(200).send(pictureObj);
        });
    } catch (err) {
        res.status(422).send(err.message);
        console.log(err);
    }
})

// return all pictures from a user
router.get('/picture/getAll/:userId', async(req, res) => {
    const user = req.params.userId;
    // console.log(user)
    try {
        await Image.find({ user: user }).sort({ "createdAt": -1 })
            .then(function(err, result) {
                if (err) {
                    console.log(err);
                    res.status(422).send(err);
                }
                // console.log(result);
                // console.log('36')
                res.status(200).json(result);
            })

    } catch (err) {
        res.status(422).send(err.message);
        console.log(err);
    }
})


.put('/:id', (req, res, next) => {
    Image.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(updated => res.send(updated))
        .catch(next);
})

.delete('/picture/delete/:id', (req, res, next) => {
    const id = req.params.id;
    Image.findByIdAndRemove(id)
        .then(deleted => res.send(deleted))
        .catch(next);
});

module.exports = router;