import React from "react";
import styles from "./UserDetail.module.css";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { useLocation } from "react-router-dom";
import { get } from "lodash";
import {PDFDownloadLink} from "@react-pdf/renderer";
import MyDocument from "./UserDetail.pdf";

const UserDetail = () => {
  const location = useLocation();
  const user = get(location, "state", {});
  console.log("user", user);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img
          alt={get(user, "id.name", "")}
          className={styles.avatar}
          src={get(user, "picture.large", "")}
        />
        <div className={styles.detail}>
          <h2 className={styles.name}>{`${get(user, "name.first", "")} ${get(
            user,
            "name.last",
            ""
          )}`}</h2>
          <p className="text-center">
            {get(user, "location.city", "")} {get(user, "location.country", "")}
          </p>
          <ListGroup>
            <ListGroupItem>
              <div className={styles.pullLeft}>Birthdate</div>
              <div className={styles.pullRight}>
                {get(user, "dob.date", "")}
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div className={styles.pullLeft}>Age</div>
              <div className={styles.pullRight}>{get(user, "dob.age", "")}</div>
            </ListGroupItem>
            <ListGroupItem>
              <div className={styles.pullLeft}>Gender</div>
              <div className={styles.pullRight}>{get(user, "gender", "")}</div>
            </ListGroupItem>
            <ListGroupItem>
              <div className={styles.pullLeft}>Telephone</div>
              <div className={styles.pullRight}>{get(user, "phone", "")}</div>
            </ListGroupItem>
            <ListGroupItem>
              <div className={styles.pullLeft}>Email</div>
              <div className={styles.pullRight}>{get(user, "email", "")}</div>
            </ListGroupItem>
          </ListGroup>
          <div className="text-center mt-3">
            <PDFDownloadLink document={<MyDocument data={user} />} fileName="user.pdf"> 
              {
                ({loading}) => loading ? "Loading document..." : <Button color="success">Export</Button>
              }
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
