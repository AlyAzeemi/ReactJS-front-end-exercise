const Dashboard = ({ setIsAuthenticated, JWToken }) => {
  const logOut = async () => {
    try{
      let res = await fetch("http://localhost:5000/api/logout", {
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
      console.error(`Error during log out: ${e}`)
    }
  };
  
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
