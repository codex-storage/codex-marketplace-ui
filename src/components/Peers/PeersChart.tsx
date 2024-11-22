import "./PeersChart.css";
import * as echarts from "echarts/core";
import { TooltipComponent } from "echarts/components";
import { SVGRenderer } from "echarts/renderers";
import { GaugeChart } from "echarts/charts";
import { useEffect, useRef, useState } from "react";

type Props = {
  actives: number;
  percent: number;
};

// type CustomCSSProperties = React.CSSProperties & {
//   "--codex-peers-degrees": number;
// };

echarts.use([GaugeChart, TooltipComponent, SVGRenderer]);

export function PeersChart({ actives, percent }: Props) {
  const div = useRef<HTMLDivElement>(null);
  const chart = useRef<echarts.EChartsType | null>(null);
  const [, setRefresher] = useState(Date.now());

  useEffect(() => {
    if (div.current && !chart.current) {
      chart.current = echarts.init(div.current, null, {
        renderer: "svg",
      });
      setRefresher(Date.now());
    }
  }, [chart, div]);

  // const style: CustomCSSProperties = {
  //   "--codex-peers-degrees": percent,
  // };

  if (chart.current) {
    const options = {
      series: [
        {
          type: "gauge",
          axisLine: {
            lineStyle: {
              width: 30,
              color: [
                [0.2, "var(--codex-color-error-hexa)"],
                [0.5, "rgb(var(--codex-color-warning))"],
                [1, "var(--codex-color-primary)"],
              ],
            },
          },
          pointer: {
            itemStyle: {
              color: "auto",
            },
          },
          axisTick: {
            distance: -30,
            length: 8,
            lineStyle: {
              color: "#fff",
              width: 2,
            },
          },
          splitLine: {
            distance: -30,
            length: 30,
            lineStyle: {
              color: "#fff",
              width: 2,
            },
          },
          axisLabel: {
            color: "inherit",
            distance: 40,
            fontSize: 0,
          },
          detail: {
            valueAnimation: true,
            formatter: actives + "",
            color: "inherit",
          },
          data: [
            {
              value: percent * 100,
            },
          ],
        },
      ],
    };
    chart.current.setOption(options);
  }

  return (
    <>
      {/* <div style={style} className="peers-chart">
        <div></div>
        <span>{actives}</span>
      </div> */}
      <div
        id="chart"
        ref={div}
        className="gauge"
        style={{
          width: 250,
          height: 250,
        }}></div>
    </>
  );
}
