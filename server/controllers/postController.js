const Post = require("../models/postModel")
const User = require("../models/userModel");
const path = require("path");
const fs = require("fs");
const{ v4 : uuid} = require('uuid');
const post = require("../models/postModel");
const Comment = require('../models/commentModel');

// PROTECTED
// POST : api/posts

const createPost = async(req,res) =>{
    try{
        let{ title , category ,description} = req.body;
        if(!title || !category || !description  || !req.files){
            return res.status(422).json({error : "Please fill all the fields and choose thumbnail"});
        } 
        const { thumbnail} = req.files;
        if(thumbnail.size > 2000000 ){
            return res.status(422).json({message : "Thumbnail size should be less than 2mb"});
        }
        let filename = thumbnail.name;
        let splittedFilename = filename.split(".")
        let newFilename = splittedFilename[0]  + uuid() + "." + splittedFilename[splittedFilename.length -1]
        thumbnail.mv(path.join(__dirname , '..', '/uploads' , newFilename), async(err) =>{
            if(err){
                return res.status(422).json(err);
            }else{
                const newPost = await Post.create({title , category,description,thumbnail: newFilename,
                creator: req.user.id})
                if(!post){
                    return res.status(422).json({message : "Failed to create post"});
                }
                // find user and increment post by 1
                const currentUser = await User.findById(req.user.id);
                const userPostCount = currentUser.posts + 1;
                await User.findByIdAndUpdate(req.user.id , { posts: userPostCount}) 

                res.status(201).json(newPost);
            }
        })

    }catch(error){
        console.log(error);
        res.status(404).json({messgae: error})

    }

}
// UNPROTECTED
// POST : api/posts

const getPosts = async(req,res) =>{
try{
    const posts = await Post.find().sort({updatedAt: -1})
    res.status(200).json(posts);

}catch(error){
    res.status(500).json({message : "Internal Server Error"});
}

}




// PROTECTED - fet single ost
// POST : api/posts/:id

const getPost = async(req,res) =>{

    try{
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({message : "Post not found"});
        }
        res.status(200).json(post);

    }catch(error){
        res.status(500).json({message : "Internal Server Error",error});
    }
}

const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId; // Expecting user ID in params
    const posts = await Post.find({ creator: userId }); // Find posts by user ID
    if (!posts.length) {
      return res.status(404).json({ message: "No posts found for this user." });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};




// UNPROTECTED  get posts by category
// GET : api/posts/categories/:category

const getCatPosts = async(req,res) =>{
try{
    const {category} = req.params;
    const catPosts = await Post.find({category}).sort({createdAt : -1})
    res.status(200).json(catPosts);
}catch(error){
    res.status(500).json({message : "Internal Server Error"});
}

}

// UNPROTECTED  get author post
// POST : api/posts/users/:id

// const getUserPosts = async(req,res) =>{
// try{

//     const {id} = req.params;
//     const posts = await Post.find({creator : id}).sort({createdAt: -1})
//     res.status(200).json(posts);
// }catch(error){
//     res.status(500).json({message : "Not found",error});
// }
// }


// PROTECTED - EDIT POST
// PATCH : api/posts/:id

const editPost = async(req,res) =>{

    try{

        let fileName;
        let newFilename;
        let updatedPost;
        const postId = req.params.id;
        const {title,category,description} = req.body;
        if(!title || !category || description.length < 12  ){
            return res.status(400).json({message : "Please fill all fields"});
        }
        if(!req.files){
            updatedPost = await Post.findByIdAndUpdate(postId , {title,category , description},{new:true})
        }else{
        //   get old post from database  //
        const oldPost = await Post.findById(postId);
        console.log("Old Post : ",oldPost);

        if (oldPost.thumbnail) {
            console.log("Deleting old thumbnail:", oldPost.thumbnail);
        }
        
        // delete thumbnail from upload
        fs.unlink(path.join(__dirname, '..' , 'uploads', oldPost.thumbnail), async(err) =>{
            if(err){
                console.log(err);
            }
           
        }) 
         // upload new thumbnail
         const {thumbnail} = req.files;
         if(thumbnail.size > 2000000){
             return res.status(400).json({message : "File size too large"});
         }
         fileName = thumbnail.name;
         let splittedFilename = fileName.split('.')
         newFilename = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length -1]
         thumbnail.mv(path.join(__dirname , '..' ,'uploads',newFilename),async(err) =>{
             if(err){
                 console.log(err);
             }
         })
         updatedPost = await Post.findByIdAndUpdate(postId ,{title, category,description,thumbnail : newFilename},{new: true} )

        }
        if(!updatedPost){
            return res.status(404).json({message : "Not Able to Update"});
        }
      return  res.status(200).json(updatedPost);

    }catch(error){
       return res.status(500).json({message : "not able to Edit",error});
        console.log(error);

    }

}



const deletePost = async (req, res) => {
    try {
      const postId = req.params.id;
      if (!postId) {
        return res.status(404).json({ message: "Post Unavailable" });
      }
  
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      const filename = post?.thumbnail;
  
      // Check if the current user is the creator of the post
      if (req.user.id == post.creator) {
        // Delete the thumbnail file
        fs.unlink(path.join(__dirname, '..', 'uploads', filename), async (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: "File deletion error" });
          }
  
          // If file is deleted successfully, delete the post
          await Post.findByIdAndDelete(postId);
  
          // Reduce post count of user
          const currentUser = await User.findById(req.user.id);
          const userPostCount = currentUser?.posts - 1;
          await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
  
          // Send a single response after deletion and user update
          return res.status(200).json({ message: "Post Deleted", postCount: userPostCount });
        });
      } else {
        return res.status(401).json({ message: "You are not the creator of this post" });
      }
  
    } catch (error) {
      return res.status(500).json({ message: "Not able to Delete", error });
    }
  };
  const likePost = async (req, res) => {
    try {
      const { postId } = req.params;
      const userId = req.user.id;
      
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      if (post.likes.includes(userId)) {
        // If the user already liked the post, remove the like
        post.likes = post.likes.filter(id => id.toString() !== userId);
      } else {
        // Otherwise, add the like
        post.likes.push(userId);
      }
  
      await post.save();
      res.status(200).json({ message: "Post updated", likes: post.likes.length });
    } catch (error) {
      res.status(500).json({ message: "Unable to like/unlike", error });
    }
  };
  


  const addComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { text, username } = req.body; // Include username for anonymous comments

        if (!text || text.length < 1) {
            return res.status(400).json({ message: "Comment cannot be empty" });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const newComment = await Comment.create({
            text,
            postId,
            creator: req.user ? req.user.id : null, // Assign user ID if available
            username: req.user ? null : username // Assign username if not logged in
        });

        post.comments.push(newComment._id);
        await post.save();

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: "Unable to add comment", error });
    }
};



module.exports = {createPost ,deletePost, editPost, getUserPosts, getCatPosts, getPost ,getPosts , addComment,likePost }