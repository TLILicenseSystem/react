import styled from "styled-components";
import { colors } from "../style";

export const SideBar = styled.div`
  padding-top: 0.5em;
  background-color: ${colors.SECONDARYBLUE};
  font-family: "Prompt-Regular";
  height: 93vh;
`;

export const MainMenu = styled.div`
  font-family: "Prompt-Regular";
  background-color: ${colors.SECONDARYBLUE};
  color: white;
  position: relative;
  display: block;
  padding: 0.7rem 1.5rem;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  width: 100%;
  &:hover {
    background-color: ${colors.PRIMARYBLUE};
  }
  &.active {
    background-color: ${colors.PRIMARYBLUE};
  }
`;

export const SubMenu = styled(MainMenu)`
  background-color: ${colors.SECONDARYBLUE};
  padding: 0.7rem 2.5rem;
  padding-left: 2.9rem;
  &:hover {
    background-color: ${colors.PRIMARYBLUE};
  }
  &.active {
    background-color: ${colors.PRIMARYBLUE};
  }
`;
