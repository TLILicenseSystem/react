import styled from "styled-components";
import { colors } from "../../themes/style";

export const Container = styled.div`
  background-color: #dbdbdb;
  background-color: ${colors.BG};
  // width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  // align-items: center;
`;

export const BoxCriteria = styled.div`
  width: ${({ width }) => (width ? width : "1000px")};
  background-color: #ffffff;
  border-radius: 5px; //ส่วนโค้งขอบ

  border: 1px solid ${colors.BORDER};
  font-size: 15px;
  box-shadow: 0 0 0px ${colors.BORDER};
`;

export const BoxSearch = styled.div`
  //background-color: ${({ color }) => color};
  width: ${({ width }) => (width ? width : "1000px")};
  // width:100%;
  background-color: #ffffff;
  border-radius: 5px; //ส่วนโค้งขอบ
  padding: 30px;
  margin: 10px;
  flex: 1;
  border: 1px solid ${colors.BORDER};
  font-size: 15px;
  box-shadow: 0 0 0px ${colors.BORDER};
`;
