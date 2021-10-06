const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');
const auth = require("../middleware/auth");

router.get('/', postCtrl.getAllPosts);

router.get('/:id', postCtrl.getOnePost);

router.post('/', multer, postCtrl.createPost);

router.put('/:id', multer, postCtrl.updatePost);

router.delete('/:id', postCtrl.deletePost);

module.exports = router;