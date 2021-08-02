import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
    background-color: ${({color}) => color};
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    flex: 1;

    h5, h1, p {
        text-align: center;
        margin: 0px;
        color: #ffffff;
    }

    h1 {
        font-size: 30px;
    }

    p {
        font-size: 20px;
    }
`;

const BoxCovid = ({ color, title, total, increase }) => {
  return (
      <Container color={color}>
          <h5>{title}</h5>
          <h1>{total}</h1>
          <p>(+{increase})</p>
      </Container>
  );
};

BoxCovid.defaultProps = {
  color: "#ffffff",
  title: "",
  total: 0,
  increase: 0,
};

BoxCovid.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  total: PropTypes.number,
  increase: PropTypes.number,
};

export default BoxCovid;
