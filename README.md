## Cryptodash

This is a Cryptocurrency Dashboard I made using Reactjs to showcase some of my knowledge. It includes LocalStorage and React Context API for State Management, Styled-components and CryptoCompare API for Real Pricing Data. If you feel it can help you with something, feel free to use partly or totally this code.

Fetching the data from CryptoCompare API CAN be slow. Please wait a few seconds.
<br />

<p align="center">
    <br />
      <a href="https://sharp-noether-8ad61c.netlify.app/">View Demo</a>
    <br />
  </p>

<!-- ABOUT THE PROJECT -->

## About The Project

![CryptoDash](/images/cryptodash.png?raw=true)

## Features

-   Settings Page
    -   Asking User to choose their favorites tokens
    -   Providing a default 5 coins as favorites & a complete list of all coins
    -   Searching for coins with fuzzy search
    -   Hovering and Selecting coins
    -   Adding/Removing coins on the list of favorites
    -   Disabling out chosen coins
    -   Confirm Favorite Coin
    -   Remembers those values for the user
    -   Generates dashboard prices & historical data
-   Dashboard
    -   Data initializes from remembered favorites, or forwards to Settings page
    -   Displays 5 major Cards for first 5 favorites and compact Cards for next 5
    -   Renders a line chart for the 10 historical points on current favorite symbol
    -   Select coins changes and re-fetch data, remembers current favorite
    -   Select to render historical points on Date: Days Weeks Months
    -   Display name and image of coin next to chart

### Built With

-   [ReactJs](https://fr.reactjs.org/)
-   [cryptocompare API](https://github.com/exodusmovement/cryptocompare)
-   [HighCharts](https://www.highcharts.com/)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

-   yarn
    ```sh
    npm install --global yarn
    ```

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/dcBrian/Circular-SVG-PATHS.git
    ```
2. Install all depedencies
    ```sh
    yarn install
    ```
3. Launch
    ```JS
    yarn start
    ```

<!-- CONTACT -->

## Contact

dacruzbrian1@gmail.com
