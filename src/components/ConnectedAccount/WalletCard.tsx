import "./WalletCard.css";
import ArrowRightIcon from "../../assets/icons/arrow-right.svg?react";
import ArrowLeftIcon from "../../assets/icons/arrow-left.svg?react";
import { useState, ChangeEvent, useRef, useEffect } from "react";

import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import { GridComponent } from "echarts/components";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

const defaultTokenValue = 1540;

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

type Props = {
  tab: "weekly" | "daily" | "monthly";
};

export function WalletCard({ tab }: Props) {
  const [tokenValue, setTokenValue] = useState(defaultTokenValue);
  const [currency, setCurrency] = useState("USD");
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

  useEffect(() => {
    const refresh = () => chart.current?.resize();

    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("resize", refresh);
    };
  }, []);

  const onCurrencyChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    setCurrency(value);

    if (value === "USD") {
      setTokenValue(1540);
    } else if (["BTC", "ETH"].includes(value) === false) {
      const json = await fetch(
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json"
      ).then((res) => res.json());
      setTokenValue(defaultTokenValue * json.usd[value.toLocaleLowerCase()]);
    } else {
      const json = await fetch(
        "https://api.coinbase.com/v2/prices/" +
          value.toLocaleLowerCase() +
          "-USD/spot.json"
      ).then((res) => res.json());
      setTokenValue(defaultTokenValue / json.data.amount);
    }
  };

  if (chart.current) {
    const today = new Date();
    const startOfWeek = today.getDate() - today.getDay() + 1;
    const startDates = [];

    today.setDate(startOfWeek);

    for (let i = 0; i < 5; i++) {
      startDates.push(today.toISOString().split("T")[0]);
      today.setDate(today.getDate() + 7);
    }

    const data = {
      daily: ["MON", "TUE", "WED", "THU", "WED", "SAT", "SUN"],
      weekly: startDates,
      monthly: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
    }[tab];

    const option = {
      color: ["#3EE089"],
      xAxis: {
        type: "category",
        data: data,
        show: true,
        splitLine: {
          show: true,
          lineStyle: {
            width: 0.5,
            type: "dashed",
          },
        },
      },
      yAxis: {
        type: "value",
        show: false,
      },
      grid: [
        {
          left: 0,
          right: 0,
          top: 50,
          bottom: 50,
        },
      ],
      series: [
        {
          data: [220, 932, 401, 934, 1290, 1330, 1450].slice(0, data.length),
          type: "line",
          smooth: true,
          lineStyle: {
            normal: {
              color: "#3EE089",
            },
          },
        },
      ],
      tooltip: {
        type: "item",
      },
    };

    chart.current.setOption(option, true);
  }

  return (
    <div className="wallet-card">
      <header>
        <h6>Wallet</h6>
        <div>
          <button>
            <ArrowLeftIcon></ArrowLeftIcon>
          </button>
          <button>
            <ArrowRightIcon></ArrowRightIcon>
          </button>
        </div>
      </header>

      <main>
        <section>
          <span>TOKEN</span>
          <var>123,223 CDX</var>
        </section>

        <section>
          {/* <WalletChart></WalletChart> */}
          {/* <WalletLines></WalletLines> */}
          <div
            className="lines"
            ref={div}
            style={{ height: 200, width: "100%" }}></div>
        </section>
      </main>

      <footer>
        <div>
          <span>TOKEN</span>
          <div className="row">
            <var>
              {tokenValue.toFixed(["BTC", "ETH"].includes(currency) ? 8 : 2)}{" "}
              {currency}
            </var>
            <small>+ 5%</small>
          </div>
        </div>
        <select defaultValue={currency} onChange={onCurrencyChange}>
          <option value={"USD"}>USD</option>
          <option value={"BTC"}>BTC</option>
          <option value={"ETH"}>ETH</option>
          <option value={"EUR"}>EUR</option>
          <option value={"AUD"}>AUD</option>
          <option value={"CAD"}>CAD</option>
          <option value={"CNY"}>CNY</option>
        </select>
      </footer>
    </div>
  );
}
