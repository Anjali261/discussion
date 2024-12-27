

// import "./post.scss";
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
// import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
// import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import { Link } from "react-router-dom";
// import Comments from "../comments/Comments";
// import { useState } from "react";

// const Post = ({ post }) => {
//   const [commentOpen, setCommentOpen] = useState(false);
//   const [liked, setLiked] = useState(false);

//   // Check for existence of post data
//   if (!post) return <div>Loading...</div>; // Show a loading state if post data is not yet available

//   return (
//     <div className="post">
//       <div className="container">
//         <div className="user">
//           <div className="userInfo">
//             <img src={post.profilePic || "defaultProfilePic.jpg"} alt="" />
//             <div className="details">
//               <Link
//                 to={`/profile/${post.userId}`}
//                 style={{ textDecoration: "none", color: "inherit" }}
//               >
//                 <span className="name">{post.name || "Unknown User"}</span>
//               </Link>
//               <span className="date">{post.createdAt || "Just now"}</span>
//             </div>
//           </div>
//           <MoreHorizIcon />
//         </div>
//         <div className="content">
//           <p>{post.desc || "No description available"}</p>
//           {post.img && <img src={post.img} alt="Post" />} {/* Only render image if it exists */}
//         </div>
//         <div className="info">
//           <div className="item" onClick={() => setLiked(!liked)}>
//             {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
//             {post.likes?.length || 0} Likes {/* Dynamically display the number of likes */}
//           </div>
//           <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
//             <TextsmsOutlinedIcon />
//             {post.comments?.length || 0} Comments {/* Dynamically display the number of comments */}
//           </div>
//           <div className="item">
//             <ShareOutlinedIcon />
//             Share
//           </div>
//         </div>
//         {commentOpen && <Comments postId={post._id} />} {/* Pass postId to Comments for better functionality */}
//       </div>
//     </div>
//   );
// };

// export default Post;




import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";

const Post = ({ 
  postId, 
  category, 
  title, 
  description, 
  creator, 
  thumbnail, 
  createdAt 
}) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  console.log("thumbnail is: ",thumbnail);

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={thumbnail || "defaultProfilePic.jpg"} alt="" />
            <div className="details">
              <Link
                to={`/profile/${creator}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{creator || "Unknown User"}</span>
              </Link>
              <span className="date">{new Date(createdAt).toLocaleString()}</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{description || "No description available"}</p>
          <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`} alt="" />
        </div>
        <div className="info">
          <div className="item" onClick={() => setLiked(!liked)}>
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={postId} />}
      </div>
    </div>
  );
};

export default Post;

