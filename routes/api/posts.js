const express = require('express');


const Post = require('../../models/Posts');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const auth = require('../../middlewares/auth');

const { body, validationResult } = require('express-validator');

const router = express.Router();


// route      POST api/posts
// desc       Create a post
// @access    Private

router.post('/', [auth, [
  body('text', 'Text is required').not().isEmpty()

]], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {

    const user = await User.findById(req.user.id).select('-password');

    const newPost = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    }

    const post = new Post(newPost);

    await post.save();
    res.json(post)

  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})


// route      GET api/posts
// desc       Get all posts
// @access    Private

router.get('/', auth, async (req, res) => {

  try {

    const posts = await Post.find().sort({ date: -1 });

    if (!posts) return res.status(400).json({ msg: 'Any posts haven\'t created yet' });

    res.json(posts)

  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error')
  }

});



// route      GET api/posts/post_id
// desc       Get a single post / by ID
// @access    Private

router.get('/:post_id', auth, async (req, res) => {

  try {

    const post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json({ msg: 'No post found' })

    res.json(post);

  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'No post found' })
    res.status(500).send('Server Error')
  }

});


// route      DELETE api/posts/post_id
// desc       Delete a post
// @access    Private

router.delete('/:post_id', auth, async (req, res) => {

  try {

    const post = await Post.findById(req.params.post_id)

    if (!post) return res.status(404).json({ msg: 'No post found' });

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'user not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });

  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'No post found' })
    res.status(500).send('Server Error')
  }

});


// route      PUT api/posts/like/:id
// desc       Like a post
// @access    Private

router.put('/like/:like_id', auth, async (req, res) => {

  try {

    const post = await Post.findById(req.params.like_id);

    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Post already liked' })
    }


    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes)
  } catch (err) {

    console.error(err.message);
    res.status(500).send('Server error')

  }
});


// route      PUT api/posts/unlike/:id
// desc       Unlike a post
// @access    Private

router.put('/unlike/:unlike_id', auth, async (req, res) => {

  try {

    const post = await Post.findById(req.params.unlike_id);

    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ msg: 'Post hasn\'t liked yet' })
    }

    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();
    res.json(post.likes)

  } catch (err) {

    console.error(err.message);
    res.status(500).send('Server error')

  }
});


// route      POST api/posts/comment/:comment_id
// desc       Comment on a Post
// @access    Private

router.post('/comment/:comment_id', [auth, [
  body('text', 'Text is required').not().isEmpty()

]], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {

    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.comment_id)

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    }

    post.comments.unshift(newComment);

    await post.save();
    res.json(post.comments)

  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
});


// route      DELETE api/posts/comment/:post_id/:comment_id
// desc      Delete a Comment
// @access    Private

router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {

  try {

    const post = await Post.findById(req.params.post_id);

    const comment = post.comments.find(comment => comment.id === req.params.comment_id);

    if (!comment) return res.status(404).json({ msg: 'Comment does not exist' });

    if (comment.user.toString() === req.user.id) return res.status(401).json({ msg: 'User not authorized' })


    const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();
    res.json(post.comments)

  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})


module.exports = router;