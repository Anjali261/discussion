import "./rightBar.scss";

const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <span>Anjali</span>
            </div>
            <div className="buttons">
              <button>Join Channel</button>
              <button>dismiss</button>
            </div>
          </div>
          
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Anjali</span> 
              </p>
            </div>
            <span>5 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Anjali</span> 
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Username</span> Get your daily Dose of Optimism
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Username</span> Tech Layoff Tracker and Startup Layoff Lists
              </p>
            </div>
            <span>2 min ago</span>
          </div>
        </div>
        <div className="item">
          <span>View by Post Types</span>
         <div style={{marginTop:'7px'}}>
          <button style={{padding:"0.7rem" , color:"black" , backgroundColor:"greenyellow" , borderRadius:'1rem'}}>Project Ideas</button>
         </div>
         <div style={{marginTop:'7px'}}>
          <button style={{padding:"0.7rem" , color:"black" , backgroundColor:"#CCFFCC" , borderRadius:'1rem'}}>Career</button>
         </div>
         <div style={{marginTop:'7px'}}>
          <button style={{padding:"0.7rem" , color:"black" , backgroundColor:"#CCCCFF" , borderRadius:'1rem'}}>Career</button>
         </div>
         <div style={{marginTop:'7px'}}>
          <button style={{padding:"0.7rem" , color:"black" , backgroundColor:"#FF9933" , borderRadius:'1rem'}}>Travelling</button>
         </div> <div style={{marginTop:'7px'}}>
          <button style={{padding:"0.7rem" , color:"black" , backgroundColor:"#CCE5FF" , borderRadius:'1rem'}}>Placement</button>
         </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
