import HighchartsConfig from "./HighchartsConfig";
import ReactHighcharts from "react-highcharts";
import React from "react";
import { AppContext } from "../App/AppProvider";
import { Tile } from "../Shared/Tile";
import HighchartsTheme from "./HighchartsTheme";
import ChartSelectStyled from "./ChartSelect";

ReactHighcharts.Highcharts.setOptions(HighchartsTheme);

export default function PriceChart({ topSection }) {
    return (
        <AppContext.Consumer>
            {({ historical, changeChartSelect }) => (
                <Tile>
                    <ChartSelectStyled
                        defaultValue='months'
                        onChange={(e) => changeChartSelect(e.target.value)}
                    >
                        <option value='days'>Days</option>
                        <option value='weeks'>Weeks</option>
                        <option value='months'>Months</option>
                    </ChartSelectStyled>
                    {historical ? (
                        <ReactHighcharts config={HighchartsConfig(historical)} />
                    ) : (
                        <div>Loading Historical Data</div>
                    )}
                </Tile>
            )}
        </AppContext.Consumer>
    );
}
