import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  Nav,
  NavLink,
} from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import {
  NavigationBar,
  NavigationContainer,
  ImgLogo,
  MenuDiv,
  Item,
} from "./NavbarStyles";
import Logo from "../../assets/images/logo.png";

const NavBar = () => {
  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: sessionStorage.getItem("login_name"),
  });

  const toggle = () => setDropdownOpen(!dropdownOpen);
  const logout = () => {
    history.push("/");
    sessionStorage.clear();
    window.location.reload();
  };
  return (
    <NavigationBar>
      <NavigationContainer>
        <ImgLogo src={Logo} />
        <MenuDiv>
          <Nav>
            <NavItem>
              <NavLink  onClick={() => history.push("/")} style={{cursor:'pointer'}}>
                <Item> หน้าแรก </Item>
              </NavLink>
            </NavItem>
          </Nav>
          <Nav>
            <NavItem>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle nav>
                  {" "}
                  <Item> {userData.name} </Item>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={logout}> Log out</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavItem>
          </Nav>
        </MenuDiv>

        {/* <MenuDiv>
          <Link key="main" to="/">
            หน้าแรก
          </Link>

          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle nav>Dropdown</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={logout}> Log out</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </MenuDiv> */}
      </NavigationContainer>
    </NavigationBar>
  );
};

export default NavBar;
