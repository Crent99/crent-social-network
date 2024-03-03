const { Users, Thoughts } = require("../models");

module.exports = {
// get all thoughts
async getThought(req, res) {
    try {
        const thoughtData = await Thoughts.find()
            .select("-__v")
            .populate("reactions")
            .populate("username");
        res.json(thoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    },
    
// get single thought by id
async getSingleThought(req, res) {
    try {
        const thoughtData
            = await Thoughts.findOne({ _id: req.params.thoughtId })
                .select("-__v")
                .populate("reactions")
                .populate("username");
        if (!thoughtData) {
            res.status(404).json({ message: "No thought found with this id!" });
            return;
        }
        res.json(thoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    },
// create a new thought
async createThought({ params, body }, res) {
    try {
        const thoughtData = await Thoughts.create(body);
        const userData = await Users.findOneAndUpdate(

            { _id: body.userId },
            { $push: { thoughts: thoughtData._id } },
            { new: true }
        );
        if (!userData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
        }
        res.json(thoughtData);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    },
// update thought by id
async updateThought(req, res) {
    try {
        const thoughtData
            = await Thoughts.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, {
                new: true,
                runValidators: true,
            });
        if (!thoughtData) {
            res.status(404).json({ message: "No thought found with this id!" });
            return;
        }
        res.json(thoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    },
// delete thought
async deleteThought(req, res) {
    try {
        const thoughtData = await Thoughts.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thoughtData) {
            res.status(404).json({ message: "No thought found with this id!" });
            return;
        }
        res.json(thoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    },
// create a reaction stored in a single thought's reactions array field
async createReaction(req, res) {
    try {
        const thoughtData = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true, runValidators: true }
        );
        if (!thoughtData) {
            res.status(404).json({ message: "No thought found with this id!" });
            return;
        }
        res.json(thoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    },
// delete a reaction by id

async deleteReaction(req, res) {
    try {
        const thoughtData = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        if (!thoughtData) {
            res.status(404).json({ message: "No thought found with this id!" });
            return;
        }
        res.json(thoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    }
};