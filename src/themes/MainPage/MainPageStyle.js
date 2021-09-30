import styled from "styled-components";
import { colors } from "../style";

export const Container = styled.div`
  width: 100%;
  height: 93vh;
  background-color: ${colors.BG};
`;

export const Card = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 90%;
  height: 100px;
  text-align: center;
  margin: auto;
  cursor: pointer;
  &:hover {
    box-shadow: 0 4px 7px rgb(0 0 0 / 12%), 0 4px 6px rgb(0 0 0 / 24%);
  }
`;

export const CardBody = styled.div`
  padding: 2px 16px;
  height: 100px;
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
`;
