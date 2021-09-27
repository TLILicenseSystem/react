import styled from "styled-components";
import { colors } from "../style";

export const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 100%;
  height: 100px;
  text-align: center;
  margin: auto;
  cursor: pointer;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

export const CardBody = styled.div`
  padding: 2px 16px;
  height: 100px;
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
`;
