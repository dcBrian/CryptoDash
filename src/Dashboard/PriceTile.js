import React from "react";
import styled, { css } from "styled-components";
import { CoinHeaderGridStyled } from "../Settings/CoinHeaderGrid";
import { fontSize3, fontSizeBig, greenBoxShadow } from "../Shared/Styles";
import { SelectableTile } from "../Shared/Tile";
import { AppContext } from "../App/AppProvider";

const numberFormat = (number) => {
    return +(number + "").slice(0, 7);
};

const PriceTileStyled = styled(SelectableTile)`
    ${(props) =>
        props.compact &&
        css`
            ${fontSize3}
            display:grid;
            grid-gap: 5px;
            grid-template-columns: repeat(3, 1fr);
            justify-items: right;
        `}
    ${(props) =>
        props.currentFavorite &&
        css`
            ${greenBoxShadow}
            pointer-events:none;
        `}
`;

const JustifyLeft = styled.div`
    justify-self: left;
`;
const JustifyRight = styled.div`
    justify-self: right;
`;
const TickerPrice = styled.div`
    ${fontSizeBig}
`;
const ChangePct = styled.div`
    color: green;
    ${(props) =>
        props.red &&
        css`
            color: red;
        `}
`;

function ChangePercent({ data }) {
    return (
        <JustifyRight>
            <ChangePct red={data.CHANGEPCT24HOUR < 0}>
                {numberFormat(data.CHANGEPCT24HOUR)}%
            </ChangePct>
        </JustifyRight>
    );
}

function Price({ sym, data, currentFavorite, setCurrentFavorite }) {
    return (
        <PriceTileStyled currentFavorite={currentFavorite} onClick={setCurrentFavorite}>
            <CoinHeaderGridStyled>
                <div>{sym}</div>
                <ChangePercent data={data} />
            </CoinHeaderGridStyled>
            <TickerPrice>${numberFormat(data.PRICE)}</TickerPrice>
        </PriceTileStyled>
    );
}

function PriceCompact({ sym, data, currentFavorite, setCurrentFavorite }) {
    return (
        <PriceTileStyled compact currentFavorite={currentFavorite} onClick={setCurrentFavorite}>
            <JustifyLeft>{sym}</JustifyLeft>
            <ChangePercent data={data} />

            <div>${numberFormat(data.PRICE)}</div>
        </PriceTileStyled>
    );
}

export default function PriceTile({ price, index }) {
    let sym = Object.keys(price)[0];
    let data = price[sym]["USD"];

    let TileClass = index < 5 ? Price : PriceCompact;

    return (
        <AppContext.Consumer>
            {({ currentFavorite, setCurrentFavorite }) => (
                <TileClass
                    key={sym}
                    setCurrentFavorite={() => setCurrentFavorite(sym)}
                    sym={sym}
                    data={data}
                    currentFavorite={currentFavorite === sym}
                ></TileClass>
            )}
        </AppContext.Consumer>
    );
}
