const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');
const auth = require("../middleware/auth");

router.get('/', auth, postCtrl.getAllPosts);

router.get('/:id', postCtrl.getOnePost);

router.post('/', auth, multer, postCtrl.createPost);

router.put('/:id', auth, multer, postCtrl.updatePost);

router.delete('/:id', auth, postCtrl.deletePost);

router.get('/:id/comment', auth, postCtrl.getComments);

router.post('/:id/comment', auth, postCtrl.createComment);

router.put('/:id/comment/:idComment', auth, postCtrl.updateComment);

router.delete('/:id/comment/:idComment', auth, postCtrl.deleteComment);

module.exports = router;