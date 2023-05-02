const express = require('express');
const router = express.Router();

const postsRouter = require('./posts.route');
const likeRouter = require("./likes.route");
const commentRouter = require("./comments.route");
const authRouter = require("./auth.route");


router.use('/posts', [likeRouter, postsRouter, commentRouter]);
router.use('/', authRouter);

module.exports = router;