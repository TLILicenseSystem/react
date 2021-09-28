import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import {
  NavigationBar,
  NavigationContainer,
  ImgLogo,
  MenuDiv,
} from "./NavbarStyles";
import Logo from "../../assets/images/logo.png";

const NavBar = () => {
  const history = useHistory();

  const logout = () => {
    sessionStorage.clear();
    window.location.reload();
  };
  return (
    <NavigationBar>
      <NavigationContainer>
        <ImgLogo src={Logo} />
        <MenuDiv>
          <Link key="main" to="/">
            หน้าแรก
          </Link>
          <Link key="main" onClick={logout}>
            Log out
          </Link>
        </MenuDiv>
      </NavigationContainer>
    </NavigationBar>
  );
};

export default NavBar;
