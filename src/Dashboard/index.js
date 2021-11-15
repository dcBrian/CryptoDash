import React from "react";
import Page from "../Shared/Page";
import CoinSpotlight from "./CoinSpotlight";
import PriceGrid from "./PriceGrid";
import styled, { css } from "styled-components";

const ChartGrid = styled.div`
    display: grid;
    margin-top: 20px;
    grid-gap: 15px;
    grid-template-columns: 1fr 3fr;
`;

export default function Dashboard() {
    return (
        <Page name='dashboard'>
            <PriceGrid />
            <ChartGrid>
                <CoinSpotlight />
                <div>Chart</div>
            </ChartGrid>
        </Page>
    );
}
