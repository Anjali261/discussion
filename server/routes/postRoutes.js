const {Router} = require('express')

const router = Router();
const {createPost ,deletePost, editPost, getUserPosts, getCatPosts, getPost ,getPosts ,addComment , likePost} = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware")


router.post('/', authMiddleware,createPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.patch('/:id', editPost);
router.get('/categories/:category', getCatPosts)
router.get('/users/:id', getUserPosts)
router.patch('/:id', authMiddleware,editPost)
router.delete('/:id', authMiddleware,deletePost)
router.patch('/posts/:postId/like', authMiddleware, likePost);

router.post('/posts/:postId/comment', authMiddleware, addComment);

module.exports = router