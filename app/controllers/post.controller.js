const db = require('../models');

const Post = db.posts;

exports.findAll = (req, res) => {
  Post.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error cuy di find post nya',
      });
    });
};

exports.create = (req, res) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    published: req.body.published ? req.body.published : false,
  });

  post
    .save(post)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || 'Error cuy di create post nya',
      });
    });
};

exports.findOne = (req, res) => {
  const { id } = req.params;

  Post.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || 'Error cuy di findById post nya',
      });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;
  Post.findOneAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: 'Post gk ada cuy',
        });
      }
      res.send({
        message: 'Post nya telah Update',
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || 'Error cuy di Updatenya post nya',
      });
    });
};

exports.delete = (req, res) => {
  const { id } = req.params;

  Post.findOneAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: 'Post gk ada cuy',
        });
      }
      res.send({
        message: 'Post nya telah di hapus',
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || 'Error cuy di deletnya post nya',
      });
    });
};
