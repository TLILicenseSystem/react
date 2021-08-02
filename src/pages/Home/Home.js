import React from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  const open = (path) => {
    history.push(path);
  };

  return (
    <div>
      <h1>Welcome to home</h1>
      <Button type="button" onClick={() => open("/covid")}>
        Covid
      </Button>
      <br /><br />
      <Button type="button" onClick={() => open("/user")}>
        User
      </Button>
    </div>
  );
};

export default Home;
