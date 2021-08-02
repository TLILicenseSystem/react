import React, { useState } from "react";
import styles from "./Login.module.css";
// import logo from "../../assets/images/logo.png";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { Container, InputWithLabel, Wrapper } from "../../components/shared";
import Table from "../../components/TableRoundTime/Table";
import tableStyles from "../../components/TableRoundTime/Table.module.css";
import { useDispatch } from "react-redux";
import { showSpinner } from "../../redux/actions";

const Login = () => {
  const history = useHistory();
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const dispatch = useDispatch();

  const login = () => {
    dispatch(showSpinner());
    // console.log(start, end);
    if (start === "") {
      alert("Start time is required");
    }
    if (end === "") {
      alert("End time is required");
    } else {
      // call api
      history.push("/home");
    }
  };
  const theadData = ["รหัสเวลาสอบ", "เวลาสอบ"];

  const tbodyData = [
    {
      id: "1",
      items: ["01", "08.00-10.00"],
    },
    {
      id: "2",
      items: ["02", "10.00-12.00"],
    },
    {
      id: "3",
      items: ["03", "13.00-15.00"],
    },
  ];
  return (
    <Container>
      <Wrapper>
        {/* <div className={styles.logoContainer}>
          <img className={styles.logo} alt="logo" src={logo} />
        </div> */}
        <h2 className={styles.title}>ตั้งค่าเวลาสอบ</h2>
        <div>
          <table>
            <tr>
              <td>
                <InputWithLabel
                  label="เวลาสอบเริ่มต้น"
                  value={start}
                  onChange={(e) => {
                    setStart(e.target.value);
                  }}
                />
              </td>
              <td>
                <InputWithLabel
                  label="เวลาสอบสิ้นสุด"
                  type="end"
                  value={end}
                  onChange={(e) => {
                    setEnd(e.target.value);
                  }}
                />
              </td>
            </tr>
          </table>
        </div>


        <div className={tableStyles.div}>
          <table border="1">
            <tr>
              <td>
                <Table theadData={theadData} tbodyData={tbodyData} />
              </td>
            </tr>
          </table>
        </div>


        <br></br>
        <br></br>
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
