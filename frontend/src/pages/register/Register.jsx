// import { Link, useNavigate } from "react-router-dom";
// import "./register.scss";
// import { useContext, useState } from "react";
// const Register = () => {
//   const {register , error} = useContext(AuthContextProvider)
//   const [showPopup, setShowPopup] = useState(false);

//   const[user,setUser] = useState({
//     name:"",
//     email:'',
//     password:'',
//     password2:''

//   })
//   const navigate = useNavigate();

//   const handleSubmit =async (e) =>{
//     e.preventDefault();
//     try{
   
//    const response = await register(user);
//           if (response && response.success) {
//               setShowPopup(true); 
//             setUser({ name: "", email: "", password: "", password2: "" });  
//             // setTimeout(() =>{
//             //   navigate('/login')
//             // },5000)
//       }
//     }catch(error){
//       console.log("Registration Error: ", error)
//     }
//   }
//   console.log("Auth Context Error: ", error); 
//   return (
//     <div className="register">
//       <div className="card">
//         <div className="left">
//           <h1> Social.</h1>
//           <p>
//           "Join us today and unlock a world of endless possibilities!"
//           "Sign up now and start your journey to success!"
//           </p>
//           <span>Do you have an account?</span>
//           <Link to="/login">
//           <button>Login</button>
//           </Link>
//         </div>
//         <div className="right">
//           <h1>Register</h1>
//           {error && <div className="error-message">{error}</div>} 

//           <form onSubmit={handleSubmit}>
//             <input type="text" placeholder="Username"  value={user.name} onChange={(e) => setUser({...user , name: e.target.value})} />
//             <input type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({...user , email:e.target.value})} />
//             <input type="password" required placeholder="Password" value={user.password} onChange={(e) => setUser({...user , password: e.target.value})} />
//             <input type="password"required placeholder=" Confirm Password" value={user.password2} onChange={(e) => setUser({...user , password2:e.target.value})} />
//             <button type="submit">Register</button>
//           </form>
//         </div>
//       </div>

//       { showPopup && (
//         <>
//           <div className="overlay" onClick={() => setShowPopup(false)} /> {/* Close on click */}
//           <div className="popup">
//             <h2>Registration Successful!</h2>
//             <button onClick={() => setShowPopup(false)}>Close</button>
//           </div>
        
//         </>
//       )}
//     </div>
//   );
// };

// export default Register;
