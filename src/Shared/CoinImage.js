import React from "react";
import styled, { css } from "styled-components";

const CoinImageStyled = styled.img`
    height: 50px;
    ${(props) =>
        props.spotlight &&
        css`
            height: 200px;
            margin: auto;
            display: block;
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