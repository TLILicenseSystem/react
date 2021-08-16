import styled from "styled-components";
import {colors} from "../../themes/style";

export const Wrapper = styled.div`
 // width: ${({width}) => width ? width : '800px'};
  background-color:${colors.BG};
  border-radius: 0px;
  //border: 1px solid ${colors.BORDER};
  //box-shadow: 0 0 10px ${colors.BORDER};
  padding: 20px;
  width:100%;
  padding: 50px;
  display: flex;
  justify-content: flex-end; 
`;
export const WrapperHead = styled.div`
 // width: ${({width}) => width ? width : '800px'};
  background-color:${colors.BG};
  border-radius: 0px;
  //border: 1px solid ${colors.BORDER};
  //box-shadow: 0 0 10px ${colors.BORDER};
  padding: 20px;
  width:100%;
  padding: 50px;
  display: flex;
  justify-content: flex-end; 
`;
