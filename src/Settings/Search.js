import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
import { backgroundColor2, fontSize2 } from "../Shared/Styles";
import _ from "lodash";
import fuzzy from "fuzzy";

export const SearchGrid = styled.div`
    display: grid;
    grid-template-columns: 200px 1fr;
`;
export const Searchnput = styled.input`
    ${backgroundColor2}
    ${fontSize2}
    border: 1px solid;
    color: #1163c9;
    height: 25px;
    place-self: center left;
`;

const handleFilter = _.debounce((inputValue, setFilteredCoins, coinList) => {
    let coinSymbols = Object.keys(coinList);
    let coinNames = coinSymbols.map((e) => coinList[e].CoinName);
    let allStringsToSearch = coinSymbols.concat(coinNames);
    let fuzzyResults = fuzzy
        .filter(inputValue, allStringsToSearch, {})
        .map((res) => res.string);

    let filteredCoins = _.pickBy(coinList, (result, key) => {
        let coinName = result.CoinName;
        return (
            _.includes(fuzzyResults, key) || _.includes(fuzzyResults, coinName)
        );
    });
    setFilteredCoins(filteredCoins);
}, 500);

function filterCoins(e, setFilteredCoins, coinList) {
    let inputValue = e.target.value;
    if (!inputValue) {
        setFilteredCoins(null);
        return;
    }
    handleFilter(inputValue, setFilteredCoins, coinList);
}

export default function Search({ name, symbol, topSection }) {
    return (
        <AppContext.Consumer>
            {({ setFilteredCoins, coinList }) => (
                <SearchGrid>
                    <h2>Search all coins</h2>
                    <Searchnput
                        onKeyUp={(e) => {
                            filterCoins(e, setFilteredCoins, coinList);
                        }}
                    />
                </SearchGrid>
            )}
        </AppContext.Consumer>
    );
}
