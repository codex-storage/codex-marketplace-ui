import "./PeersChart.css";

type Props = {
  actives: number;
  degrees: number;
};

type CustomCSSProperties = React.CSSProperties & {
  "--codex-peers-degrees": number;
};

export function PeersChart({ actives, degrees }: Props) {
  const style: CustomCSSProperties = {
    "--codex-peers-degrees": degrees,
  };

  return (
    <>
      <div style={style} className="peers-chart">
        <div></div>
        <span>{actives}</span>
      </div>
    </>
  );
}
