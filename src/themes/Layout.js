import React, { useEffect } from "react";
import { Row, Col } from "reactstrap";
import MainSidebar from "./Sidebar/MainSidebar";
import NavBar from "./Navbar/Navbar";
import AppRoute from "../routes";
import { Route, useHistory } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import menu1 from "../conf/menuList.json";
import menu2 from "../conf/menuListSupport.json";
import AppRoute2 from "../routesSupport";

const Layout = () => {
  const history = useHistory();

  return (
    <>
      <Row>
        <Col xs="12" sm="12" md="12" style={{ minHeight: "7vh" }}>
          <NavBar />
        </Col>
      </Row>

      {history.location.pathname.indexOf("setting/") > 0 ? (
        <Row>
          <Col xs="12" sm="2" md="2" style={{ padding: 0 }}>
            <MainSidebar title="ระบบงาน Support ใบอนุญาต" menu={menu1} />
          </Col>
          <Col xs="12" sm="10" md="10" style={{ padding: 0 }}>
            <AppRoute />
          </Col>
        </Row>
      ) : history.location.pathname.indexOf("license/") > 0 ? (
        <Row>
          <Col xs="12" sm="2" md="2" style={{ padding: 0 }}>
            <MainSidebar title="ระบบงานใบอนุญาต" menu={menu2} />
          </Col>
          <Col xs="12" sm="10" md="10" style={{ padding: 0 }}>
            <AppRoute2 />
          </Col>
        </Row>
      ) : (
        <Route path="*" render={(props) => <MainPage {...props} />} />
      )}
    </>
  );
};

export default Layout;
