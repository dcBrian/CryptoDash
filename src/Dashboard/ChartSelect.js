import styled from "styled-components";
import { backgroundColor2, fontSize2 } from "../Shared/Styles";

const ChartSelectStyled = styled.select`
    ${backgroundColor2}
    ${fontSize2}
    color:#1163c9;
    border: 1px solid;
    margin: 5px;
    position: absolute;
    right: 10px;
    z-index: 2;
`;

export default ChartSelectStyled;
