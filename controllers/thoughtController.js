const { User, Thought } = require("../models");

module.exports = {
  // Gets all thoughts
  getThought(req, res) {
    Thought.find({})
      .select("-__v")
      .sort({ _id: -1 })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Gets a single thought by its _id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Creates thoughts and adds them to the associated user's thoughts array
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) =>
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: _id } }
        )
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this ID!" })
          : res.json({ message: "Thought successfully created!" })
    )
      .catch((err) => res.status(500).json(err));
  },
  // Updates a thought by its _id
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, {
      runValidators: true,
      new: true,
    })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Deletes a thought by its _id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this ID!" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Thought deleted, but no user found'})
          : res.json({ message: 'Thought successfully deleted' })
      )
      .catch((err) => res.status(500).json(err));
  },
  // Adds a reaction to a thought
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Deletes a reaction from a thought by its _id
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};