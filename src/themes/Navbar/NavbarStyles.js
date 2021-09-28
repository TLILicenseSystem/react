import styled from "styled-components";
import { colors } from "../style";

export const NavigationBar = styled.div`
  background-color: #fff;
  min-height: 7vh;
  z-index: 9999;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
`;

export const NavigationContainer = styled.div`
  width: 100%;
  padding: 10px;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const ImgLogo = styled.img`
  float: left;
  height: 2em;
`;

export const MenuDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
