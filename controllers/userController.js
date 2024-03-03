const { Users, Thoughts } = require("../models");
 
module.exports = {
    // get all users
    async getUser(req, res) {
        try {
            const userData = await User.find()
                .select("-__v")
                .populate("thoughts")
                .populate("friends");
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // get single user by id
    async getSingleUser(req, res) {
        try {
            const userData
                = await User.findOne({ _id: req.params.userId })
                    .select("-__v")
                    .populate("thoughts")
                    .populate("friends");
            if (!userData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // create a new user
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // update user by id
    async updateUser(req, res) {
        try {
            const userData
                = await User.findOneAndUpdate({ _id: req.params.userId }, req.body, {
                    new: true,
                    runValidators: true,
                });
            if (!userData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(userData);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const userData
                = await
                User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $addToSet: { friends: req.params.friendId } },
                    { new: true }
                    );
            if (!userData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(userData);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // delete friend by id
    async removeFriend(req, res) {
        try {
            const userData
                = await
                User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $pull: { friends: req.params.friendId } },
                    { new: true }
                    );
            if (!userData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(userData);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // delete user by id
    async deleteUser(req, res) {
        try {
            const userData
                = await User.findOneAndDelete({ _id: req.params.userId });
            if (!userData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};