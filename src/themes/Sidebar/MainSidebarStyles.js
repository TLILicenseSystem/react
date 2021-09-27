import styled from "styled-components";
import { colors } from "../style";

export const SideBar = styled.div`
  // padding-top: 1rem;
  background-color: ${colors.SECONDARYBLUE};
  font-family: "Prompt-Regular";
  height: 95vh;
`;

export const MainMenu = styled.div`
  font-family: "Prompt-Regular";
  background-color: ${colors.SECONDARYBLUE};
  color: white;
  position: relative;
  display: block;
  padding: 0.5rem 1.5rem;
  text-decoration: none;
  border: 1px solid rgba(0, 0, 0, 0.125);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const SubMenu = styled(MainMenu)`
  background-color: ${colors.PRIMARYBLUE};
  padding: 0.5rem 2.5rem;
  padding-right: 0.5rem;
`;
