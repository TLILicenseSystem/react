import styled from "styled-components";
import {colors} from "../../themes/style";

export const Wrapper = styled.div`
  width: ${({width}) => width ? width : '1000px'};
  background-color: #ffffff;
  border: 1px solid ${colors.BORDER};
  box-shadow: 0 0 10px ${colors.BORDER};
  padding: 15px;
`;
