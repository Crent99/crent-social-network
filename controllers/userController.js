 const { User } = require("../models");
 module.exports = {
   // Gets all users
   getUser(req, res) {
     User.find({})
       .select("-__v")
       .sort({ _id: -1 })
       .then((user) => res.json(user))
       .catch((err) => res.status(500).json(err));
   },
//   / / Gets a single user by its _id and populated thought and friend data
   getSingleUser(req, res) {
     User.findOne({ _id: req.params.userId })
       .select("-__v")
       .populate("thoughts")
       .populate("friends")
       .then((user) =>
         !user
           ? res.status(404).json({ message: "No user found with this ID!" })
           : res.json(user)
       )
       .catch((err) => res.status(500).json(err));
   },
   // Creates a user
   createUser(req, res) {
     User.create(req.body)
       .then((user) => res.json(user))
       .catch((err) => res.status(500).json(err));
   },
   // Updates a user by its _id
   updateUser(req, res) {
     User.findOneAndUpdate({ _id: req.params.userId }, req.body, {
       runValidators: true,
       new: true,
     })
       .then((user) =>
         !user
           ? res.status(404).json({ message: "No user found with this ID!" })
           : res.json(user)
       )
       .catch((err) => res.status(500).json(err));
   },
   // Deletes a user by its _id
   deleteUser(req, res) {
     User.findOneAndDelete({ _id: req.params.userId })
       .then((user) =>
         !user
           ? res.status(404).json({ message: "No user found with this ID!" })
           : res.json(user)
       )
       .catch((err) => res.status(500).json(err));
   },
   // Adds a friend to a user's friend list
   addFriend(req, res) {
    User.findOneAndUpdate(
       { _id: req.params.userId },
       { $addToSet: { friends: req.params.friendId } },
       { new: true }
     )
       .then((user) =>
         !user
           ? res.status(404).json({ message: "No user found with this ID!" })
           : res.json(user)
       )
       .catch((err) => res.status(500).json(err));
   },
   // Removes a friend from a user's friend list
   removeFriend(req, res) {
     User.findOneAndUpdate(
       { _id: req.params.userId },
       { $pull: { friends: req.params.friendId } },
       { new: true }
     )
      .then((user) =>
         !user
           ? res.status(404).json({ message: "No user found with this ID!" })
           : res.json(user)
       )
      .catch((err) => res.status(500).json(err));
   },
 };