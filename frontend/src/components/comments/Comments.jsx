

import { useContext } from "react";
import "./comments.scss";

const Comments = () => {
  // const { user } = useContext(AuthContextProvider);
  const user={};
  
  // Temporary comment data
  const comments = [
    {
      id: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam.",
      name: "Username",
      userId: 1,
      profilePicture: "", // Provide a default image or handle the empty case in UI
    },
    {
      id: 2,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam.",
      name: "Anjali",
      userId: 2,
      profilePicture: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];

  return (
    <div className="comments">
      <div className="write">
        {user ? (
          <>
            <img src={user.profilePic} alt="Profile" />
            <input type="text" placeholder="Write a comment" />
            <button>Send</button>
          </>
        ) : (
          <p>Please log in to comment.</p> // Fallback message for non-logged in users
        )}
      </div>
      {comments.length === 0 ? (
        <p>No comments available.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="comment">
            <img src={comment.profilePicture || 'default-profile-pic-url'} alt="Profile" />
            <div className="info">
              <span>{comment.name}</span>
              <p>{comment.desc}</p>
            </div>
            <span className="date">1 hour ago</span>
          </div>
        ))
      )}
    </div>
  );
};

export default Comments;

