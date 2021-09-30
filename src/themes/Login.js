import React, { useState } from "react";
import { Container, Row, Col, FormFeedback } from "reactstrap";
import { InputWithLabelRow, SubmitButton } from "../components/shared";
import { useHistory } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { colors } from "./style";

const Login = () => {
  const [data, setData] = useState({
    email: {
      value: "",
      validation: {
        required: true,
      },
      valid: false,
    },
    password: {
      value: "",
      validation: {
        required: true,
        minLength: 1,
      },
      valid: false,
    },
  });
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onChange = (e) => {
    var target = e.target;
    data[target.name].value = target.value;
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    console.log(re.test(email));

    return re.test(email);
  };

  const checkValidate = (value, rule) => {
    let isValid = false;
    if (rule.required) {
      isValid = value.trim() === "";
    }
    if (rule.minLength) {
      isValid = value.length < rule.minLength;
    }
    return isValid;
  };
  const login = () => {
    setError(null);
    setLoading(true);

    var x, error;
    for (x in data) {
      data[x].valid = checkValidate(data[x].value, data[x].validation);
      if (data[x].valid) error = true;
    }

    if (!error) {
      sessionStorage.setItem("login", "Y");
      sessionStorage.setItem("login_name", "firstName lastName");
      window.location.reload();
      //   let postdata = {
      //     username: data.username.value,
      //     password: data.password.value
      //   };
      //   postLogin(postdata).then(res => {
      //     if (res && res.status === 200) {
      //       localStorage.setItem("bac_access_token", res.data.access_token);
      //       localStorage.setItem("bac_roles", JSON.stringify(res.data.roles));
      //       localStorage.setItem(
      //         "bac_permission",
      //         JSON.stringify(res.data.permission)
      //       );
      //       localStorage.setItem(
      //         "bacUserData",
      //         JSON.stringify({
      //           id: res.data.id,
      //           imageUrl:res.data.imageUrl,
      //           firstName: res.data.firstName,
      //           lastName: res.data.lastName,
      //           phoneNumber: res.data.phone,
      //           emailAddress: res.data.email
      //         })
      //       );
      //       localStorage.setItem("login", "Y");
      //       window.location.reload();
      //       // this.props.history.push("/Home");
      //     } else {
      //       this.setState({
      //         errormsg: res.data.message,
      //         loading: false
      //       });
      //     }
      //   });
    } else {
      setLoading(false);
    }
    setData(data);
  };

  return (
    <Container>
      <Row style={{ height: "100vh" }}>
        <Col
          xs="12"
          sm="6"
          md="6"
          style={{ textAlign: "center", margin: "auto" }}
        >
          <h5 style={{ fontWeight: "bold", color: colors.PRIMARYRED }}>
            <img src={Logo} /> Admin And View{" "}
          </h5>
        </Col>
        <Col
          xs="12"
          sm="6"
          md="6"
          style={{
            textAlign: "left",
            margin: "auto",
            borderLeft: "1px solid #ced4d9",
            paddingLeft: "2em",
          }}
        >
          <h5>Log on</h5>
          <br />
          <Row form>
            <Col md={6}>
              <InputWithLabelRow
                label="Email"
                type="email"
                id="email"
                placeholder="Email"
                value={data.email.value}
                onChange={onChange}
                textboxSize={12}
                invalid={data.email.valid}
              />
            </Col>
            <Col md={6}>
              <InputWithLabelRow
                label="Password"
                type="password"
                id="password"
                placeholder="Password"
                value={data.password.value}
                onChange={onChange}
                textboxSize={12}
                invalid={data.password.valid}
              />
              {data.password.valid && (
                <FormFeedback>{data.password.valid}</FormFeedback>
              )}
            </Col>
          </Row>
          <Row>
            <Col md={6} style={{ textAlign: "center" }}>
              <SubmitButton type="button" title="Log on" onClick={login} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
