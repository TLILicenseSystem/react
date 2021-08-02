// import React, { useState } from "react";
// import styles from "./Login.module.css";
// // import logo from "../../assets/images/logo.png";
// import { Button } from "reactstrap";
// import { useHistory } from "react-router-dom";
// import { Container, InputWithLabel, Wrapper } from "../../components/shared";
// import Table from "../../components/TableRoundTime/Table";
// import tableStyles from "../../components/TableRoundTime/Table.module.css";
// import { useDispatch } from "react-redux";
// import { showSpinner } from "../../redux/actions";
// import * as ReactBootstrap from "react-bootstrap";

// const Login = () => {
//     const player = [
//         { position:"Forward",name:"name1",team:"tem1" },
//         { position:"Guarrd",name:"name2",team:"tem2" },
//         { position:"Guarrd",name:"name3",Teteamam:"tem3" },
//         { position:"Guarrd",name:"name4",team:"tem4" }
//     ]

//     const renderPlayer = (player, index) => {
//         return(
//             <tr key={index}>
//                 <td>{player.name}</td>
//                 <td>{player.position}</td>
//                 <td>{player.team}</td>
//             </tr>
//         )
//     }
//   return (
//     <ReactBootstrap.Table striped bordered hover>
//     <thead>
//       <tr>

//         <th>Name</th>
//         <th>Position</th>
//         <th>Team</th>
//       </tr>
//     </thead>
//     <tbody>
//         {player.map(renderPlayer)}
//     </tbody>
//   </ReactBootstrap.Table>
//   );
// };

// export default Login;

import React, { useState } from "react";
import styles from "./Login.module.css";
import logo from "../../assets/images/logo.png";
import { Button } from "reactstrap";
import {useHistory} from "react-router-dom";
import {Container, InputWithLabel, Wrapper} from "../../components/shared";
import {useDispatch} from "react-redux";
import {showSpinner} from "../../redux/actions";

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const login = () => {
    dispatch(showSpinner());
    // console.log(username, password);
    if (username === "") {
      alert("Username is required");
    }
    else {
      // call api
      history.push("/home");
    } 
  }

  return (
    <Container>
      <Wrapper>
        <div className={styles.logoContainer}>
          <img className={styles.logo} alt="logo" src={logo} />
        </div>
        <h2 className={styles.title}>Login</h2>
        <InputWithLabel
          label="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <InputWithLabel
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="text-center">
          <Button type="button" color="primary" onClick={login}>
            Submit
          </Button>
        </div>
      </Wrapper>
    </Container>
  );
};

export default Login;

