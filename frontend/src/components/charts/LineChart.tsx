import { ResponsiveLine } from "@nivo/line"
import { ChartProps } from "@/app/pages/Dashboard";

// interface Point {
//     x: string | number | Date;
//     y: number | string | Date;
// }
  
// interface LineChartData {
//     id: string;
//     data: Point[];
// }
  
// export interface LineChartProps {
//     lineData: LineChartData[];
// }

export const LineChart: React.FC<ChartProps> = ({ chartData, xLabel, yLabel }) => {
    return (
      <div className="aspect-[8/5]">
        <ResponsiveLine
          data={chartData}
        margin={{ top: 50, right: 20, bottom: 50, left: 60 }}
          xScale={{
            type: "point",
          }}
          yScale={{
            type: "linear",
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: xLabel,
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: yLabel,
            legendOffset: -40,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        //   colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
          useMesh={true}
          gridYValues={6}
          theme={{
            tooltip: {
              chip: {
                borderRadius: "9999px",
              },
              container: {
                fontSize: "12px",
                textTransform: "capitalize",
                borderRadius: "6px",
              },
            },
            grid: {
              line: {
                stroke: "#f3f4f6",
              },
            },
          }}
          role="application"
        />
      </div>
    )
  }