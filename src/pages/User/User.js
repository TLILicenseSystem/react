import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { getAllUser } from "../../api/apiHelper";
import { get } from "lodash";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { showPopup } from "../../redux/actions";

const User = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const [userData, setUserData] = useState([]);
  const { data, isLoading, isSuccess } = useFetch("/?results=10"); // {data, isLoading, isSuccess}
  // console.log('data', data);
  const userData = get(data, "results", []);

  const handleClick = (user) => {
    dispatch(showPopup({
      title: `${get(user, "name.first", "")} ${get(user, "name.last", "")}`,
      description: "Do you want to open user profile detail?",
      action: () => {
        history.push("/user-detail", user);
      },
    }));
  };

  // const fetchData = async () => {
  //   const response = await getAllUser();
  //   console.log('response', response);
  //   setUserData(response);
  // }

  // useEffect(() => {
  //     fetchData();
  // }, [])

  return (
    <Container>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <Table hover striped responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item, index) => (
              <tr key={item.login.uuid}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    className="rounded-circle mr-3"
                    alt={get(item, "name.first", "")}
                    src={get(item, "picture.thumbnail", "")}
                  />
                  {`${get(item, "name.first", "")} ${get(
                    item,
                    "name.last",
                    ""
                  )}`}
                </td>
                <td>{get(item, "dob.age", "")}</td>
                <td>
                  {/* {get(item, 'gender', '') === 'male' && <i class="fas fa-mars"></i>}
                {get(item, 'gender', '') === 'female' && <i class="fas fa-venus"></i>} */}
                  {get(item, "gender", "") === "male" ? (
                    <i class="fas fa-mars"></i>
                  ) : (
                    <i class="fas fa-venus"></i>
                  )}
                </td>
                <td>{get(item, "email", "")}</td>
                <td>{get(item, "phone", "")}</td>
                <td>
                  <Button
                    color="primary"
                    size="sm"
                    onClick={() => handleClick(item)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default User;
