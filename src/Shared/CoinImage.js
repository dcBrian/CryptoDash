import React from "react";
import styled, { css } from "styled-components";

const CoinImageStyled = styled.img`
    height: 50px;
    margin: auto;
    display: block;
    ${(props) =>
        props.spotlight &&
        css`
            height: 200px;
        `}
`;

export default function CoinImage({ coin, spotlight }) {
    return (
        <CoinImageStyled
            spotlight={spotlight}
            alt={coin.CoinSymbol}
            src={`https://cryptocompare.com${coin.ImageUrl}`}
        />
    );
}
