import React from "react";
import _ from "lodash";
import moment from "moment";
const cc = require("cryptocompare");
cc.setApiKey("28ea682f930131774c17125e08a7398dac5661f80aefbd82a81cf471274e50c2");
export const AppContext = React.createContext();
const MAX_FAVORITES = 10;
const TIME_UNIT = 10;

class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "dashboard",
            favorites: ["BTC", "XMR", "DOGE", "ETH", "ADA"],
            ...this.saveSettings(),
            timeInterval: "months",
            setPage: this.setPage,
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            isInFavorites: this.isInFavorites,
            setCurrentFavorite: this.setCurrentFavorite,
            confirmFavorites: this.confirmFavorites,
            setFilteredCoins: this.setFilteredCoins,
            changeChartSelect: this.changeChartSelect,
        };
    }

    componentDidMount() {
        this.fetchCoins();
        this.fetchPrices();
        this.fetchHistorical();
    }

    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        this.setState({ coinList });
    };

    fetchPrices = async () => {
        if (this.state.firstVisit) return;
        let prices = await this.prices();
        prices = prices.filter((price) => Object.keys(price).length);
        this.setState({ prices });
    };

    fetchHistorical = async () => {
        if (this.state.firstVisit) return;
        let results = await this.historical();

        let historical = [
            {
                name: this.state.currentFavorite,
                data: results.map((el, i) => [
                    moment()
                        .subtract({ [this.state.timeInterval]: TIME_UNIT - i })
                        .valueOf(),
                    el.USD,
                ]),
            },
        ];
        this.setState({ historical });
    };

    prices = async () => {
        let res = [];
        for (let i = 0; i < this.state.favorites.length; i++) {
            try {
                let priceData = await cc.priceFull(this.state.favorites[i], "USD");
                res.push(priceData);
            } catch (e) {
                console.warn("Fetch price error");
            }
        }
        return res;
    };

    historical = () => {
        //Compiling an array of promises
        let promises = [];

        for (let units = TIME_UNIT; units > 0; units--) {
            promises.push(
                cc.priceHistorical(
                    this.state.currentFavorite,
                    ["USD"],
                    moment()
                        .subtract({ [this.state.timeInterval]: units })
                        .toDate()
                )
            );
        }
        return Promise.all(promises);
    };

    addCoin = (key) => {
        let favorites = [...this.state.favorites];
        if (favorites.length < MAX_FAVORITES) {
            favorites.push(key);
            this.setState({ favorites });
        }
    };

    removeCoin = (key) => {
        let favorites = [...this.state.favorites];
        this.setState({ favorites: _.pull(favorites, key) });
    };

    isInFavorites = (key) => _.includes(this.state.favorites, key);

    confirmFavorites = () => {
        let currentFavorite = this.state.favorites[0];
        this.setState(
            {
                page: "dashboard",
                firstVisit: false,
                currentFavorite: currentFavorite,
                prices: null,
                historical: null,
            },
            () => {
                this.fetchPrices();
                this.fetchHistorical();
            }
        );
        localStorage.setItem(
            "cryptoDash",
            JSON.stringify({
                favorites: this.state.favorites,
                currentFavorite: currentFavorite,
            })
        );
    };

    setCurrentFavorite = (sym) => {
        this.setState({ currentFavorite: sym, historical: null }, this.fetchHistorical);
        localStorage.setItem(
            "cryptoDash",
            JSON.stringify({
                ...JSON.parse(localStorage.getItem("cryptoDash")),
                currentFavorite: sym,
            })
        );
    };

    saveSettings() {
        let cryptoDash = JSON.parse(localStorage.getItem("cryptoDash"));

        if (!cryptoDash) {
            return { page: "settings", firstVisit: true };
        }
        let { favorites, currentFavorite } = cryptoDash;
        return { favorites, currentFavorite };
    }

    setPage = (page) => this.setState({ page });

    setFilteredCoins = (filteredCoins) => this.setState({ filteredCoins });

    changeChartSelect = (value) => {
        this.setState({ timeInterval: value, historical: null }, this.fetchHistorical);
    };

    render() {
        return <AppContext.Provider value={this.state}>{this.props.children}</AppContext.Provider>;
    }
}

export default AppProvider;
