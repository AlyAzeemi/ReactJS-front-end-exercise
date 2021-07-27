import { Link } from "react-router-dom";
const Dashboard = ({ setIsAuthenticated }) => {
  const callLogOutAPI = async (JWToken) => {
    try{
      let res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: JWToken }),
    });
    res = await res.json();
    console.log(res);
    if (res.success) {
      setIsAuthenticated(false);
    }
  }catch(e){
    
  }
    
  };
  const logOut = async () => {};
  return (
    <div>
      <h1>User Dashboard</h1>
      <form onSubmit={logOut}>
        <input type="submit" value="Log Out" className="btn btn-block" />
      </form>
    </div>
  );
};

export default Dashboard;
