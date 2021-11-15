import React from "react";
import Page from "../Shared/Page";
import { Tile } from "../Shared/Tile";
import PriceGrid from "./PriceGrid";
import { AppContext } from "../App/AppProvider";
import CoinImage from "../Shared/CoinImage";
import styled, { css } from "styled-components";

const SpotlightName = styled.h2`
    text-align: center;
`;

export default function CoinSpotlight() {
    return (
        <AppContext.Consumer>
            {({ currentFavorite, coinList }) => (
                <Tile>
                    <SpotlightName>{coinList[currentFavorite].CoinName}</SpotlightName>
                    <CoinImage spotlight coin={coinList[currentFavorite]} />
                </Tile>
            )}
        </AppContext.Consumer>
    );
}
