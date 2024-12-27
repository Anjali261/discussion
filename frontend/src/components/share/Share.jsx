// import "./share.scss";
// import Image from "../../assets/img.png";
// import Map from "../../assets/map.png";
// import Friend from "../../assets/friend.png";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../context/authContext";
// import { PostContext } from "../../context/postContext";

// const Share = () => {
//   const { user } = useContext(AuthContext); 
//   const { createPost } = useContext(PostContext); 

//   const [postContent, setPostContent] = useState("");
//   const [postTitle, setPostTitle] = useState("");
//   const [postCategory, setPostCategory] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [categories, setCategories] = useState([]); 


//   // useEffect(() => {
//   //   const fetchCategories = async () => {
//   //     try {
//   //       const response = await axios.get('http://localhost:4000/api/categories');
//   //       setCategories(response.data); 
//   //     } catch (error) {
//   //       console.error('Error fetching categories:', error);
//   //     }
//   //   };

//   //   fetchCategories();
//   // }, []);

//   const handlePostCreation = async () => {
//     if (!postTitle.trim() || !postCategory.trim() || !postContent.trim()) {
//       alert("Please fill all the fields."); // Ensure fields are not empty
//       return;
//     }

//     // Create a FormData object for file upload
//     const formData = new FormData();
//     formData.append("title", postTitle);
//     formData.append("category", postCategory);
//     formData.append("description", postContent);

//     // If a file is selected, add it to the formData
//     if (selectedFile) {
//       formData.append("thumbnail", selectedFile);
//       console.log("Selected file:", selectedFile); 

//     }else {
//       alert("Please choose a thumbnail.");
//       return; 
//   }


//     try {
//       await createPost(formData); 
//       setPostContent("");
//       setPostTitle("");
//       setPostCategory("");
//       setSelectedFile(null);
//     } catch (error) {
//       console.error("Failed to create post", error);
//       alert("Failed to create post: " + error.message); 
//     }
//   };

//   return (
//     <div className="share">
//       <div className="container">
//         <div className="top">
//           <img src={user?.profilePic} alt="" />
//           <input
//             type="text"
//             placeholder="Title"
//             value={postTitle}
//             onChange={(e) => setPostTitle(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Category"
//             value={postCategory}
//             onChange={(e) => setPostCategory(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder={`What's on your mind, ${user?.name}?`}
//             value={postContent}
//             onChange={(e) => setPostContent(e.target.value)}
//           />
//         </div>
//         <hr />
//         <div className="bottom">
//           <div className="left">
//             <input
//               type="file"
//               id="file"
//               style={{ display: "none" }}
//               onChange={(e) => setSelectedFile(e.target.files[0])}
//             />
//             <label htmlFor="file">
//               <div className="item">
//                 <img src={Image} alt="" />
//                 <span>Add Image</span>
//               </div>
//             </label>
//             <div className="item">
//               <img src={Map} alt="" />
//               <span>Add Place</span>
//             </div>
//             <div className="item">
//               <img src={Friend} alt="" />
//               <span>Tag Friends</span>
//             </div>
//           </div>
//           <div className="right">
//             <button onClick={handlePostCreation}>Share</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Share;

import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
// import { AuthContextProvider } from "../../context/authContext";
import { PostContext } from "../../context/postContext";

const Share = () => {
  // const { user } = useContext(AuthContextProvider); 
  const user={};
  const { createPost } = useContext(PostContext); 

  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [categories, setCategories] = useState([]); 

  // Uncomment to fetch categories from the backend
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:4000/api/categories');
  //       setCategories(response.data); 
  //     } catch (error) {
  //       console.error('Error fetching categories:', error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  const handlePostCreation = async () => {
    if (!postTitle.trim() || !postCategory.trim() || !postContent.trim()) {
      alert("Please fill all the fields."); // Ensure fields are not empty
      return;
    }

    // Create a FormData object for file upload
    const formData = new FormData();
    formData.append("title", postTitle);
    formData.append("category", postCategory);
    formData.append("description", postContent);

    // If a file is selected, add it to the formData
    if (selectedFile) {
      formData.append("thumbnail", selectedFile);
      console.log("Selected file:", selectedFile); 
    } else {
      alert("Please choose a thumbnail.");
      return; 
    }

    try {
      await createPost(formData); 
      setPostContent("");
      setPostTitle("");
      setPostCategory("");
      setSelectedFile(null);
    } catch (error) {
      console.error("Failed to create post", error);
      alert("Failed to create post: " + error.message); 
    }
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={user?.profilePic} alt="" />
          <div className="title-category"> {/* Added div for title and category */}
            <input
              type="text"
              placeholder="Title"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Category"
              value={postCategory}
              onChange={(e) => setPostCategory(e.target.value)}
            />
          </div>
          <input
            type="text"
            placeholder={`What's on your mind, ${user?.name}?`}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handlePostCreation}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;




