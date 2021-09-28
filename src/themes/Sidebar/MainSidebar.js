import React, { useState } from "react";
import { List } from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { SideBar, MainMenu, SubMenu } from "./MainSidebarStyles";

const MainSidebar = (props) => {
  const [menu, setMenu] = useState(props.menu);
  const [isOpen, setIsOpen] = useState(false);
  const [indexOpen, setIndexOpen] = useState(0);

  const toggle = (index) => {
    setIsOpen(!isOpen);

    if (indexOpen === index) setIndexOpen(null);
    else setIndexOpen(index);
  };
  return (
    <SideBar>
      <h5 style={{ textAlign: "center", color: "#fff" }}>{props.title}</h5>
      <List type="unstyled">
        {menu.map((item, index) => (
          <div key={index}>
            {item.submenu ? (
              <>
                <MainMenu onClick={() => toggle(index)}>
                  {item.main}
                  {item.submenu && (
                    <FontAwesomeIcon
                      icon={index === indexOpen ? faAngleUp : faAngleDown}
                      className="float-right"
                    />
                  )}
                </MainMenu>
                <div style={index === indexOpen ? {} : { display: "none" }}>
                  {item.submenu.map((sub, subindex) => (
                    <Link key={`${index}-${subindex}`} to={sub.path}>
                      <SubMenu
                        key={`${index}-${subindex}`}
                        className="main-list sub-menu"
                      >
                        {sub.title}
                      </SubMenu>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Link key={index} to={item.path}>
                <MainMenu key={index}>{item.main}</MainMenu>
              </Link>
            )}
          </div>
        ))}
      </List>
    </SideBar>
  );
};

export default withRouter(MainSidebar);
