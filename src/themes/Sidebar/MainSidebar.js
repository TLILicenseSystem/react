import React, { useState, useEffect } from "react";
import { List } from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { SideBar, MainMenu, SubMenu } from "./MainSidebarStyles";
import { get } from "lodash";

const MainSidebar = (props) => {
  const [menu, setMenu] = useState(props.menu);
  const [isOpen, setIsOpen] = useState(false);
  const [indexOpen, setIndexOpen] = useState(0);

  const toggle = (index) => {
    setIsOpen(!isOpen);

    if (indexOpen === index) setIndexOpen(null);
    else setIndexOpen(index);
  };

  useEffect(() => {
    menu.map((item, index) => {
      if (item.submenu) {
        const found = item.submenu.find((sub) => {
          if (get(props.location, "pathname", "").indexOf(sub.path) >= 0)
            return sub;
        });
        if (found) {
          setIndexOpen(index);
        }
        return;
      }
    });
  }, []);
  return (
    <SideBar>
      <h6
        style={{
          color: "#fff",
          margin: "14px 0 14px 14px",
          paddingLeft: "10px",
        }}
      >
        {props.title}
      </h6>
      <List
        type="unstyled"
        style={{ borderTop: "1px solid rgba(0, 0, 0, 0.125)" }}
      >
        {menu.map((item, index) => (
          <div key={index}>
            {item.submenu ? (
              <>
                <MainMenu onClick={() => toggle(index)}>
                  <div>
                    <i class={item.icon}></i> {item.main}{" "}
                  </div>
                  {item.submenu && (
                    <FontAwesomeIcon
                      icon={index === indexOpen ? faAngleUp : faAngleDown}
                      className="float-right"
                    />
                  )}
                </MainMenu>
                <div
                  style={
                    index === indexOpen
                      ? { borderTop: "1px solid rgba(0, 0, 0, 0.125)" }
                      : { display: "none" }
                  }
                >
                  {item.submenu.map((sub, subindex) => (
                    <Link key={`${index}-${subindex}`} to={sub.path}>
                      <SubMenu
                        key={`${index}-${subindex}`}
                        className={
                          get(props.location, "pathname", "").indexOf(
                            sub.path
                          ) >= 0
                            ? "main-list sub-menu active"
                            : "main-list sub-menu"
                        }
                      >
                        {""}
                        {sub.title}
                      </SubMenu>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Link key={index} to={item.path}>
                <MainMenu
                  key={index}
                  className={
                    get(props.location, "pathname", "").indexOf(item.path) >=
                      0 && " active"
                  }
                >
                  <div>
                    <i class={item.icon}></i> {item.main}{" "}
                  </div>
                </MainMenu>
              </Link>
            )}
          </div>
        ))}
      </List>
    </SideBar>
  );
};

export default withRouter(MainSidebar);
