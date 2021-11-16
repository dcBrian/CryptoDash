import React from "react";
import { AppContext } from "../App/AppProvider";
import { DeletableTile, DisabledTile, SelectableTile } from "../Shared/Tile";
import CoinImage from "./../Shared/CoinImage";
import CoinHeaderGrid from "./CoinHeaderGrid";

function clickCoinHandler(topSection, coinKey, addCoin, removeCoin) {
    return topSection
        ? () => {
              removeCoin(coinKey);
          }
        : () => {
              addCoin(coinKey);
          };
}

export default function CoinTile({ coinKey, topSection }) {
    let TileClass = SelectableTile;

    return (
        <AppContext.Consumer>
            {({ coinList, addCoin, removeCoin, isInFavorites }) => {
                let coin = coinList[coinKey];
                if (topSection) {
                    TileClass = DeletableTile;
                } else if (isInFavorites(coinKey)) {
                    TileClass = DisabledTile;
                }
                return (
                    <TileClass onClick={clickCoinHandler(topSection, coinKey, addCoin, removeCoin)}>
                        <CoinHeaderGrid
                            topSection={topSection}
                            name={coin.CoinName}
                            symbol={coin.Symbol}
                        />

                        <CoinImage coin={coin}></CoinImage>
                    </TileClass>
                );
            }}
        </AppContext.Consumer>
    );
}
