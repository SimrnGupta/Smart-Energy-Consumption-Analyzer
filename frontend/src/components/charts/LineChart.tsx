import * as d3 from "d3";

import { ResponsiveLine } from "@nivo/line"
import { ChartProps } from "@/app/pages/Dashboard";

const themeObject = {
    "axis" : {
        "legend": {
            "text": {
                "fontSize": 17,
                "fill": "#6b7280",
                "outlineWidth": 3,
                "outlineColor": "transparent"
            }
        },
    },
    "tooltip": {
        "wrapper": {},
        "container": {
            "background": "#fafafa",
            "color": "#333333",
            "fontSize": 12
        }
    }
};

export const LineChart: React.FC<ChartProps> = ({ chartData, xLabel, yLabel }) => {
    return (
        <div className="aspect-[8/4]">

            <ResponsiveLine
                data={chartData}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                }}
                theme={themeObject}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -45,
                    legend: xLabel,
                    legendOffset: 40,
                    legendPosition: 'middle',
                    truncateTickAt: 0,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: yLabel,
                    legendOffset: -50,
                    legendPosition: 'middle',
                    truncateTickAt: 0,
                    format: function(val) {
                        console.log("val : ", d3.format(".2s")(val))
                        return d3.format(".2s")(val)
                    }
                }}
                colors={{ scheme: 'category10' }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabel="data.yFormatted"
                pointLabelYOffset={-12}
                enableTouchCrosshair={true}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    )
  }